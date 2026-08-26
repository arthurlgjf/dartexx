'use client'

import { useEffect, useState, type FormEvent } from 'react'

import type { Form } from '@/payload-types'
import { Checkbox, Input, Label, Select, Textarea } from '@/components/ui'

type Field = NonNullable<Form['fields']>[number]
type NamedField = Extract<Field, { name: string }>

/** Fired by ProductDetailOverlay's CTA — carries the machine title. */
const PREFILL_EVENT = 'automat:dopyt'

export function FormRenderer({ form }: { form: Form }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [prefill, setPrefill] = useState<{ fieldName: string; text: string; product: string } | null>(
    null,
  )

  // Product detail overlay → "Chcem cenovú ponuku" prefills the message field.
  useEffect(() => {
    function handlePrefill(event: Event) {
      const productTitle = (event as CustomEvent<string>).detail
      const targetField = (form.fields ?? []).find(
        (field): field is Extract<NamedField, { blockType: 'textarea' | 'message' }> =>
          field.blockType === 'textarea' || field.blockType === 'message',
      )
      if (!targetField) return
      setPrefill({
        fieldName: targetField.name,
        text: `Záujem o automat: ${productTitle}`,
        product: productTitle,
      })
    }

    window.addEventListener(PREFILL_EVENT, handlePrefill)
    return () => window.removeEventListener(PREFILL_EVENT, handlePrefill)
  }, [form])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formEl = event.currentTarget
    setStatus('submitting')
    setMessage('')

    const data = new FormData(formEl)
    const submissionData = (form.fields ?? [])
      .filter((field): field is NamedField => 'name' in field)
      .map((field) => {
        const value = data.get(field.name)
        return {
          field: field.name,
          value: field.blockType === 'checkbox' ? value === 'on' : (value ?? ''),
        }
      })

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        const errors: string[] | undefined = body?.errors?.map(
          (e: { message?: string }) => e.message ?? '',
        )
        throw new Error(
          errors?.filter(Boolean).join(' ') ||
            'Niečo sa pokazilo. Skúste to, prosím, znova.',
        )
      }

      formEl.reset()
      setStatus('success')
      setMessage('Ďakujeme — vaša správa bola odoslaná.')
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error ? error.message : 'Niečo sa pokazilo. Skúste to, prosím, znova.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-x-3 gap-y-3">
      {prefill && (
        <div className="col-span-12 flex items-center justify-between gap-2 rounded-lg border border-accent-500/30 bg-accent-500/10 px-2 py-2 text-sm text-accent-200">
          <span>
            Dopyt sa týka: <strong className="font-semibold">{prefill.product}</strong>
          </span>
          <button
            type="button"
            onClick={() => setPrefill(null)}
            aria-label="Odobrať automat z dopytu"
            className="cursor-pointer text-accent-300 transition hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {(form.fields ?? []).map((field) => {
        if (field.blockType === 'message') return null

        const label = ('label' in field && field.label) || field.name
        const required = 'required' in field ? field.required === true : false
        const id = `field-${field.id ?? field.name}`

        if (field.blockType === 'checkbox') {
          return (
            <label key={id} className="col-span-12 flex items-center gap-2">
              <Checkbox name={field.name} required={required} />
              <span className="text-sm text-zinc-300">{label}</span>
            </label>
          )
        }

        const wide = field.blockType === 'textarea'

        return (
          <div key={id} className={wide ? 'col-span-12' : 'col-span-12 sm:col-span-6'}>
              <Label htmlFor={id} required={required}>
                {label}
              </Label>

              {field.blockType === 'textarea' ? (
                <Textarea
                  key={prefill?.fieldName === field.name ? prefill.text : 'textarea'}
                  id={id}
                  name={field.name}
                  required={required}
                  rows={5}
                  placeholder={label}
                  defaultValue={prefill?.fieldName === field.name ? prefill.text : undefined}
                />
              ) : field.blockType === 'select' ? (
                <Select id={id} name={field.name} required={required} defaultValue="">
                  <option value="" disabled>
                    Vyberte…
                  </option>
                  {(field.options ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={id}
                  type={
                    field.blockType === 'email'
                      ? 'email'
                      : field.blockType === 'number'
                        ? 'number'
                        : 'text'
                  }
                  name={field.name}
                  required={required}
                  placeholder={label}
                />
              )}
          </div>
        )
      })}

      {status !== 'idle' && message && (
        <p
          role="status"
          className={`col-span-12 rounded-lg border px-2 py-2 text-sm ${
            status === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="col-span-12 justify-self-start rounded-button bg-accent-500 px-2 py-1 text-base leading-3 font-semibold text-white transition hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Odosielam…' : (form.submitButtonLabel || 'Odoslať')}
      </button>
    </form>
  )
}
