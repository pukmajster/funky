<script lang="ts">
  import FullscreenMenu from '../../components/fullscreen-menu/FullscreenMenu.svelte'
  import { fullscreenMenuStore } from '../../components/fullscreen-menu/store'

  function openPlaylistsManager() {
    fullscreenMenuStore.set('playlists-manager')
  }

  import { modalStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../../stores/user'
  import { db } from '../../db/db'
  import { liveQuery } from 'dexie'
  import { activeProfileStore } from '../../stores/active-profile'
  import { Trash, Pencil } from 'lucide-svelte'
  import { deleteProfile } from '../../api/api'
  import classNames from 'classnames'
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

<FullscreenMenu id="playlists-manager" label="Playlists">
  <div class="max-w-[600px] mx-auto space-y-2">
    {#if !!$profiles}
      <div class="grid grid-cols-1 bg-surface-600 overflow-hidden rounded-lg">
        {#each $profiles as profile}
          {@const isEnabled = $userStore.activeProfileId === profile.id}
          <div
            data-enabled={isEnabled}
            class=" flex overflow-hidden [&:not(:last-child)]:border-b border-surface-800 data-[enabled=true]:bg-primary-600 data-[enabled=true]:text-white data-[enabled=true]:text-black data-[enabled=false]:hover:bg-surface-300/10"
          >
            <button
              on:click={() => ($userStore.activeProfileId = profile.id)}
              class="flex-1 h-[40px] pl-3 flex justify-between items-center"
            >
              <span class=" max-w-[200px] text text-ellipsis whitespace-nowrap overflow-hidden"
                >{profile.label}
              </span>
            </button>

            {#if profile.id !== 1}
              <button
                data-enabled={isEnabled}
                class="hover:bg-white/10 data-[enabled=true]:hover:bg-black/20 h-full aspect-square grid place-items-center"
                on:click={() => promptConfirmDeleteProfile(profile.id)}
              >
                <Trash
                  class={classNames('text-red-500 ', {
                    'text-red-500': !isEnabled,
                    'text-white': isEnabled
                  })}
                  size={18}
                />
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
</FullscreenMenu>
