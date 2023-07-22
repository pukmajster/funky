<script lang="ts">
  import games from 'shared/games'
  import { userStore } from '../stores/user'

  const gameIds = Object.keys(games)
</script>

<select class="select variant-form-material" bind:value={$userStore.activeGameId}>
  {#each gameIds as gameId}
    {@const gameLabel = games['550'].label}
    <option value={+gameId}>{gameLabel}</option>
  {/each}
</select>
