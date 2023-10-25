<script lang="ts">
  import { view } from '../stores/view'
  import PackerModal from './PackerModal.svelte'
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton'

  function openPackerModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: PackerModal,
      // Add the component properties as key/value pairs
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: import('@skeletonlabs/skeleton').ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }
</script>

{#if $view == 'tools'}
  <div>
    <h1 class="text-3xl mb-4 my-6">Tools</h1>

    <h2 class="text-xl">VPK Packer</h2>
    <button on:click={openPackerModal} class="btn variant-filled-surface">create VPK</button>
  </div>
{/if}
