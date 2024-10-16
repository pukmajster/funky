<script>
  import { SlideToggle } from '@skeletonlabs/skeleton'
  import { userStore } from '../../../stores/user'
</script>

<SlideToggle
  name="onlineMetadataFetching"
  active="bg-green-500"
  bind:checked={$userStore.enableNetworking}
  class="flex items-center gap-2"
>
  {#if $userStore.enableNetworking}
    <span class="text-green-500">Enabled</span>
  {:else}
    <span class="text-red-500">Disabled</span>
  {/if}
</SlideToggle>

<p>
  A surprising amount of mod VPKs come with incorrectly formatted or straight up missing
  addoninfo.txt's. Without these files, Funky can't read typical mod metadata, like titles and
  descriptions.
</p>

<p>
  By enabling networking, Funky can fetch mod metadata online by contacting the Steam workshop
  directly. This request does not contain any personal data, only a list of mod IDs with missing
  data.
</p>
