<script lang="ts">
  import FullscreenMenu from '../../components/fullscreen-menu/FullscreenMenu.svelte'
  import { modalStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../../stores/user'
  import { db } from '../../db/db'
  import { liveQuery } from 'dexie'
  import { activeProfileStore } from '../../stores/active-profile'
  import { Trash, Pencil, PlusIcon } from 'lucide-svelte'
  import { deleteProfile } from '../../api/api'
  import classNames from 'classnames'
  import { fullscreenMenuStore } from '../../components/fullscreen-menu/store'
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

  function selectPlaylist(playlistId: number) {
    $userStore.activeProfileId = playlistId
    fullscreenMenuStore.set(undefined)
  }
</script>

<FullscreenMenu id="playlists-manager" label="Playlists">
  <div class="w-[360px] mx-auto space-y-2">
    {#if !!$profiles}
      <div class="grid grid-cols-1 bg-surface-600 overflow-hidden rounded-lg">
        {#each $profiles as profile}
          {@const isEnabled = $userStore.activeProfileId === profile.id}
          <div
            data-enabled={isEnabled}
            class="group flex overflow-hidden [&:not(:last-child)]:border-b border-surface-800 data-[enabled=true]:bg-primary-600 data-[enabled=true]:text-white data-[enabled=true]:text-black data-[enabled=false]:hover:bg-surface-300/10"
          >
            <button
              on:click={() => selectPlaylist(profile.id)}
              class="flex-1 text-sm h-[38px] pl-3 flex justify-between items-center"
            >
              <span
                class={classNames(
                  ' max-w-[200px] text text-ellipsis whitespace-nowrap overflow-hidden',
                  {
                    ' font-semibold': isEnabled
                  }
                )}
                >{profile.label}
              </span>
            </button>

            {#if profile.id !== 1}
              <button
                data-enabled={isEnabled}
                class="hidden group-hover:grid hover:bg-white/10 data-[enabled=true]:hover:bg-black/20 h-full aspect-square place-items-center"
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
              class="hidden group-hover:grid hover:bg-white/10 data-[enabled=true]:hover:bg-black/20 h-full aspect-square place-items-center"
              on:click={() => promptEditProfileModal(profile.id)}
            >
              <Pencil size={18} />
            </button>
          </div>
        {/each}

        <div
          class="group flex overflow-hidden border-surface-800 text-white hover:bg-surface-300/10"
        >
          <button
            on:click={promptNewProfileModal}
            class="flex-1 h-[38px] text-sm gap-1 flex justify-center items-center"
          >
            <PlusIcon /> New Playlist
          </button>
        </div>
      </div>
    {/if}
  </div>
</FullscreenMenu>
