<script lang="ts">
  import { userStore } from '../../../stores/user'
  import SettingsHeader from '../components/SettingsHeader.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'
  import SettingsDropdown from '../components/SettingsDropdown.svelte'
  import SettingsPaper from '../components/SettingsPaper.svelte'
</script>

<SettingsHeader label="Addons" />

<SettingsSwitch
  label="Hide descriptions"
  description="Mod descriptions are usually formatted in Markdown, which Funky does not support. If disabled, you're likely to see walls of barely-readable text."
  bind:value={$userStore.hideDescriptions}
/>

<SettingsHeader label="Thumbnails" />

<SettingsPaper label="Preferred thumbnail aspect ratio">
  <svelte:fragment slot="description">
    <p>
      Sadly thumbnails come in a variety of aspect ratios, so you can choose which one you prefer.
      Wide is 16:9 and square is 1:1.
    </p>
    <p />
  </svelte:fragment>

  <svelte:fragment slot="main">
    <SettingsDropdown
      bind:value={$userStore.thumbnailsPreferredAspectRatio}
      options={[
        {
          label: 'Wide',
          value: 'wide'
        },
        {
          label: 'Square',
          value: 'square'
        }
      ]}
    />
  </svelte:fragment>
</SettingsPaper>

<SettingsPaper label="Wasted space">
  <svelte:fragment slot="description">
    <p>
      Choose how to fill the wasted space around thumbnails that don't fit your preferred aspect
      ratio.
    </p>
  </svelte:fragment>

  <svelte:fragment slot="main">
    <SettingsDropdown
      bind:value={$userStore.thumbnailsWastedSpace}
      options={[
        {
          label: 'Stretch',
          value: 'stretch'
        },
        {
          label: 'Blur',
          value: 'fill-blur'
        },
        {
          label: 'Black',
          value: 'fill-black'
        },
        {
          label: 'None',
          value: 'none'
        }
      ]}
    />
  </svelte:fragment>
</SettingsPaper>

<SettingsHeader label="Experimental" />

<SettingsSwitch
  label="Enable experimental manifest parser"
  description="This new parser should do a much better job at parsing vpk metadata and only relying on the workshop API for mods with missing addoninfo.txt's. You can try it by right-clicking the refresh button to see if it works."
  bind:value={$userStore.enableExperimentalManifestParser}
/>
