<script lang="ts">
  import { activeProfileStore } from '../../stores/active-profile'
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton'
  import PackerModal from '../vpk/PackerModal.svelte'
  let collectionInput = ''

  function openPackerModal() {
    modalStore.trigger({
      type: 'component',
      component: { ref: PackerModal, slot: '<p>Pack it!</p>' }
    })
  }

  async function createPlaylistFromCollection() {
    await activeProfileStore.createProfileFromCollection(collectionInput)
  }
</script>

<div class="p-4">
  <h1 class="text-3xl mb-6">Tools</h1>

  <section class="mb-8">
    <h2 class="text-xl mb-2">VPK Packer</h2>
    <button on:click={openPackerModal} class="btn variant-filled-surface">
      Create VPK
    </button>
  </section>

  <section>
    <h2 class="text-xl mb-2">Create Playlist from Collection</h2>
    <div class="flex gap-2 items-center">
      <input
        type="text"
        bind:value={collectionInput}
        placeholder="Steam Collection URL or ID"
        class="input variant-form-material flex-1"
      />
      <button
        on:click={createPlaylistFromCollection}
        class="btn variant-filled-surface"
        disabled={!collectionInput.trim()}
      >
        Create Profile
      </button>
    </div>
  </section>
</div>