<script>
  import { userStore } from '../../../stores/user'
</script>

<p>
  To enable certain features, like unsubscribing from workshop mods directly within Funky, requires
  you providing your Steam Web API key, which you can get from
  <a
    href="https://steamcommunity.com/dev/apikey"
    target="_blank"
    rel="noopener noreferrer"
    class="text-primary-500"
  >
    here</a
  >. Funky will only ever use this key to unsubscribe you from workshop mods, and nothing else.
</p>

<div class="flex items-center gap-2">
  <input
    class="w-full input variant-form-material"
    id="steamWebApiKey"
    placeholder="Steam Web API Key"
    bind:value={$userStore.steamWebApiKey}
  />
  <button class="btn variant-filled" on:click={() => ($userStore.steamWebApiKey = '')}>Clear</button
  >
</div>

<aside class="alert variant-filled-error">
  <p>
    <strong>Warning:</strong> Providing Funky with your Steam Web API key means it will be stored in
    plain text in your config file, meaning it can be accessed by anyone for malicious purposes. You
    can however always revoke your key from the same link as above.
  </p>
</aside>
