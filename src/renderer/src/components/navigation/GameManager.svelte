<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../../stores/user'
  import { db } from '../../db/db'
  import { liveQuery } from 'dexie'
  import { activeProfileStore } from '../../stores/active-profile'
  import { Trash, Pencil } from 'lucide-svelte'
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

  function promptEditProfileModal(profileId) {
    const profileName = $profiles.find((p) => p.id === profileId)?.label

    if (!profileName) return console.error('No profile name found')

    modalStore.trigger({
      type: 'prompt',
      title: `Edit Playlist "${profileName}"`,
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
      title: `Delete Playlist "${profileName}"?`,
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
        <div class="grid grid-cols-1 bg-surface-500 overflow-hidden rounded-lg">
          {#each $profiles as profile}
            {@const isEnabled = $userStore.activeProfileId === profile.id}
            <div
              data-enabled={isEnabled}
              class="flex overflow-hidden [&:not(:last-child)]:border-b border-surface-800 data-[enabled=true]:bg-slate-200 data-[enabled=true]:text-black data-[enabled=false]:hover:bg-surface-600"
            >
              <button
                on:click={() => ($userStore.activeProfileId = profile.id)}
                class="flex-1 h-[42px] pl-3 flex justify-between items-center"
              >
                <span class=" max-w-[200px] text text-ellipsis whitespace-nowrap overflow-hidden"
                  >{profile.label}
                </span>
              </button>

              {#if profile.id !== 1 && profile.id !== 2}
                <button
                  data-enabled={isEnabled}
                  class="hover:bg-white/10 data-[enabled=true]:hover:bg-black/20 h-full aspect-square grid place-items-center"
                  on:click={() => promptConfirmDeleteProfile(profile.id)}
                >
                  <Trash color="#d4163c" size={18} />
                </button>
              {/if}

              <button
                data-enabled={isEnabled}
                class="hover:bg-white/10 data-[enabled=true]:hover:bg-black/20 h-full aspect-square grid place-items-center"
                on:click={() => promptEditProfileModal(profile.id)}
              >
                <Pencil size={18} />
              </button>
            </div>
          {/each}
        </div>
      {/if}

      <div class="pb-1" />

      <div class="space-y-2">
        <div class="flex justify-end gap-2">
          <button class="btn btn-sm variant-filled" on:click={promptNewProfileModal}>
            New Playlist
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="arrow variant-filled-surface !bg-surface-700" />
</div>
