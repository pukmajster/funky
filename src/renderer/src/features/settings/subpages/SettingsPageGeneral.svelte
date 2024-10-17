<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsDivider from '../components/SettingsDivider.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
</script>

<h4 class="font-semibold text-lg">Addons</h4>

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsDivider />
