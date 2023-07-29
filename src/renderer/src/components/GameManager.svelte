<script lang="ts">
  import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton'
  import { nanoid } from 'nanoid'
  import games from 'shared/games'
  import { userStore } from '../stores/user'

  let newProfileName = ''

  $: activeGameId = $userStore.activeGameId

  const gameIds = Object.keys(games)

  // $: {
  //   Object.keys($gamePreferences).length == 0 &&
  //     $currentGame &&
  //     gamePreferences.set({
  //       [$currentGame]: {
  //         collections: [],
  //         activeProfile: 'default',
  //         profiles: [
  //           {
  //             id: 'default',
  //             label: 'Default',
  //             enabledAddons: [],
  //             randomizedCategories: []
  //           }
  //         ]
  //       }
  //     })
  // }

  function promptNewProfileModal() {
    modalStore.trigger({
      type: 'prompt',
      title: 'New profile',
      body: 'Enter the name of the new profile',
      value: '',
      valueAttr: { type: 'text', minlength: 1, maxlength: 64, required: true },
      response: (r: string) => {
        if (r)
          userStore.addProfile({
            id: nanoid(),
            label: r,
            enabledAddonIds: [],
            shuffles: {}
          })
      }
    })
  }
</script>

<div data-popup="gameManagerPopup">
  <div
    class="flex border border-solid border-surface-600 flex-grow !z-50 items-stretch rounded-md overflow-hidden shadow-lg bg-surface-700"
  >
    <div class="w-[180px] space-y-2 p-4 bg-surface-800">
      <h4 class="h4">Game</h4>
      <ListBox>
        {#each gameIds as gameId}
          {@const gameLabel = games[gameId].label}
          <ListBoxItem bind:group={$userStore.activeGameId} name={gameId} value={+gameId}
            >{gameLabel}</ListBoxItem
          >
        {/each}
      </ListBox>
    </div>

    <!-- <div class="w-[1px] bg-surface-600" /> -->

    <div class="w-[360px] p-4 space-y-2">
      <h4 class="h4">Profile</h4>

      <ListBox>
        {#each $userStore.games[activeGameId]?.profiles ?? [] as profile}
          {@const activeGameId = $userStore.activeGameId}
          <ListBoxItem
            bind:group={$userStore.games[activeGameId].activeProfileId}
            name={profile.id}
            value={profile.id}>{profile.label}</ListBoxItem
          >
        {/each}
      </ListBox>

      <div class="pb-3" />

      <div class="space-y-2">
        <div class="flex justify-end gap-2">
          <button class="btn btn-sm variant-filled" on:click={promptNewProfileModal}
            >New Profile</button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="arrow variant-filled-surface !bg-surface-700" />
</div>
