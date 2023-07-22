<script lang="ts">
  import { userStore } from '../stores/user'

  let newProfileName = ''

  const { activeGameId, games } = $userStore

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

  function createNewProfile() {
    if (!newProfileName) return

    // let newProfile = {
    //   id: newProfileName.toLowerCase().replace(/\s/g, '-'),
    //   label: newProfileName,
    //   enabledAddons: [],
    //   randomizedCategories: []
    // }

    // gamePreferences.update((prefs) => {
    //   prefs[$currentGame].profiles.push(newProfile)
    //   return prefs
    // })
  }
</script>

<select
  class="select variant-form-material"
  value={$userStore.games[activeGameId]?.activeProfileId}
  on:change={(e) => userStore.setActiveProfileId(e.currentTarget.value)}
>
  {#each games[activeGameId]?.profiles ?? [] as profile}
    <option value={profile.id}>{profile.label}</option>
  {/each}
</select>

<hr />

<div class="flex gap-2">
  <input
    class="input variant-form-material"
    type="text"
    bind:value={newProfileName}
    placeholder="New profile...."
  />

  <button class="btn variant-filled" on:click={createNewProfile} disabled={!newProfileName.length}
    >create profile</button
  >
</div>
