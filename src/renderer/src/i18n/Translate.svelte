<script lang="ts">
  import { translations } from './store'

  export let token: string
  export let values = undefined
  export let as = 'span'

  $: rawTranslations = token in $translations ? $translations[token] : token

  function transpile(translation, values) {
    for (let i = 0; i < values.length; i++) {
      translation = translation.replaceAll(`{${i}}`, values[i])
    }
    return translation
  }

  $: result = values ? transpile(rawTranslations, values) : rawTranslations
</script>

<svelte:element this={as} data-token={token}>
  {result}
</svelte:element>
