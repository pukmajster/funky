<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsHeader from '../components/SettingsHeader.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
</script>

<SettingsHeader label="Start-up" />

<SettingsSwitch
  label="Refresh manifest on startup"
  description="Automatically scan for any newly installed mods on startup."
  bind:value={$userStore.refreshManifestOnStartup}
/>

<SettingsHeader label="Mods" />

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsSwitch
  label="Show Workshop mod IDs"
  description="Displays the mod's Workshop ID in the mod overview."
  bind:value={$userStore.showWorkshopIds}
/>
