<script lang="ts">
  import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../stores/user'
  import { db } from '../db/db'
  import { liveQuery } from 'dexie'
  import { activeProfileStore } from '../stores/active-profile'

  $: activeProfileId = $userStore.activeProfileId
  const profiles = liveQuery(async () => await db.profiles.toArray())
  $: console.log('profiles:', $profiles)

  $: {
    const activeProfile = $profiles?.find((p) => p.id === activeProfileId)
    if (activeProfile) {
      activeProfileStore.set(activeProfile)
    }
  }

  function promptNewProfileModal() {
    modalStore.trigger({
      type: 'prompt',
      title: 'New profile',
      body: 'Enter the name of the new profile',
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
      title: 'Edit Profile: ' + profileName,
      body: 'Rename the profile',
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
</script>

<div data-popup="gameManagerPopup">
  <div
    class="flex border border-solid border-surface-600 flex-grow !z-50 items-stretch rounded-md overflow-hidden shadow-lg bg-surface-700"
  >
    <div class="w-[360px] p-4 space-y-2 bg-surface-800">
      <h4 class="h4">Profile</h4>

      {#if !!$profiles}
        <ListBox>
          {#each $profiles as profile}
            <ListBoxItem
              bind:group={$userStore.activeProfileId}
              name={`${profile.id}`}
              value={profile.id}>{profile.label}</ListBoxItem
            >
          {/each}
        </ListBox>
      {/if}

      <div class="pb-3" />

      <div class="space-y-2">
        <div class="flex justify-between gap-2">
          <button class="btn btn-sm variant-ghost" on:click={promptEditProfileModal}
            >Edit Profile</button
          >

          <button class="btn btn-sm variant-filled" on:click={promptNewProfileModal}
            >New Profile</button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="arrow variant-filled-surface !bg-surface-700" />
</div>
