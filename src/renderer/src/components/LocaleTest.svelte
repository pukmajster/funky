<script>
  import { translations } from '../i18n/store'
  import Translate from '../i18n/Translate.svelte'
  import { view } from '../stores/view'

  console.log('translations', $translations)
</script>

<div class:hidden={$view != 'i18nTest'}>
  <Translate token="Header.Settings" />

  <pre>
    {JSON.stringify($translations, null, 2)}
  </pre>
</div>
