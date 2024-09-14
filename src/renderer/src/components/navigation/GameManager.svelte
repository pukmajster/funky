<script lang="ts">
  import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../../stores/user'
  import { db } from '../../db/db'
  import { liveQuery } from 'dexie'
  import { activeProfileStore } from '../../stores/active-profile'
  import { X } from 'lucide-svelte'
  import { deleteProfile } from '../../api/api'
  $: activeProfileId = $userStore.activeProfileId
  const profiles = liveQuery(async () => await db.profiles.toArray())

  $: {
    const activeProfile = $profiles?.find((p) => p.id === activeProfileId)
    if (activeProfile) {
      activeProfileStore.set(activeProfile)
    }
  }

  function promptNewProfileModal() {
    modalStore.trigger({
      type: 'prompt',
      title: 'New playlist',
      body: 'Enter the name of the new playlist',
      value: '',
      valueAttr: { type: 'text', minlength: 1, maxlength: 64, required: true },
      response: (r: string) => {
        if (r) {
          db.profiles.add({
            label: r,
            enabledAddonIds: [],
            enabledShuffleIds: []
          })
        }
      }
    })
  }

  function promptEditProfileModal() {
    const profileId = activeProfileId
    const profileName = $profiles.find((p) => p.id === profileId)?.label

    if (!profileName) return console.error('No profile name found')

    modalStore.trigger({
      type: 'prompt',
      title: 'Edit Playlist: ' + profileName,
      body: 'Rename the playlist',
      value: profileName,
      valueAttr: { type: 'text', minlength: 1, maxlength: 64, required: true },
      response: (r: string) => {
        if (r) {
          //userStore.renameProfile(profileId, r)
          db.profiles.update(profileId, { label: r })
        }
      }
    })
  }

  function promptConfirmDeleteProfile(profileId) {
    const profileName = $profiles.find((p) => p.id === profileId)?.label

    if (!profileName) return console.error('No profile name found')

    modalStore.trigger({
      type: 'confirm',
      title: 'Delete Playlist ' + profileName + '?',
      body: 'Are you sure you wish to proceed?',
      response: (r: boolean) => {
        if (r) {
          deleteProfile(profileId)
        }
      }
    })
  }
</script>

<div data-popup="gameManagerPopup">
  <div
    class="flex border border-solid border-surface-600 flex-grow !z-50 items-stretch rounded-md overflow-hidden shadow-lg bg-surface-700"
  >
    <div class="w-[360px] p-4 space-y-2 bg-surface-800">
      <h4 class="h4">Playlists</h4>

      {#if !!$profiles}
        <ListBox>
          {#each $profiles as profile}
            <ListBoxItem
              bind:group={$userStore.activeProfileId}
              name={`${profile.id}`}
              value={profile.id}
            >
              <div class="flex justify-between items-center w-full">
                <p>{profile.label}</p>
                <!-- if profile id 1 or 2, skip delete button, they are default profiles -->
                {#if profile.id !== 1 && profile.id !== 2}
                <button
                  class="hover:bg-red-300 rounded-full"
                  style="padding: 2px;"
                  on:click={() => promptConfirmDeleteProfile(profile.id)}
                >
                  <X color="#ff0000" size={22} />
                </button>
                {/if}
              </div>
            </ListBoxItem>
          {/each}
        </ListBox>
      {/if}

      <div class="pb-3" />

      <div class="space-y-2">
        <div class="flex justify-between gap-2">
          <button class="btn btn-sm variant-ghost" on:click={promptEditProfileModal}
            >Edit Playlist</button
          >

          <button class="btn btn-sm variant-filled" on:click={promptNewProfileModal}
            >New Playlist</button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="arrow variant-filled-surface !bg-surface-700" />
</div>
