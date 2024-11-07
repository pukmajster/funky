<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'

  function close() {
    modalStore.close()
  }
</script>

<div class="bg-surface-800 max-w-[600px] p-8 shadow-lg rounded-lg space-y-4">
  <h4 class="h4">Load Order</h4>

  <p>
    Pick the priority mods that get loaded first, in order from top to bottom. Mods that are not in
    the load order will be loaded after all other mods.
  </p>

  <button on:click={close} class="btn btn-sm variant-filled">Close</button>
</div>
