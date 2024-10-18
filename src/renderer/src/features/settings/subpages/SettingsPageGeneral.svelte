<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsHeader from '../components/SettingsHeader.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
</script>

<SettingsHeader label="Addons" />

<!-- <SettingsSwitch
  label="Fetch missing metadata from the Steam Workshop"
  description="A good amount of mods (especially Workshop ones) don't provide metadata. Enabling this will fetch the missing metadata from the Steam Workshop API. Mods outside the Workshop obviously can't utilize this feature."
  bind:value={$userStore.enableWorkshopMetadataFetching}
/> -->

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsSwitch
  label="Adaptive thumbnails"
  description="Displays thumbnails in their native aspect ratio when enabled."
  bind:value={$userStore.enableAdaptiveThumbnails}
/>

<SettingsHeader label="Experimental" />

<SettingsSwitch
  label="Enable experimental manifest parser"
  description="This new parser should do a much better job at parsing vpk metadata and only relying on the workshop API for mods with missing addoninfo.txt's. You can try it by right-clicking the refresh button to see if it works."
  bind:value={$userStore.enableExperimentalManifestParser}
/>
