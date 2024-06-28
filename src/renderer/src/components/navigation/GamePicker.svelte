<script lang="ts">
  import games from 'shared/games'
  import { L4D2_GAME_ID } from '../../utils'

  const gameIds = Object.keys(games)
</script>

<select class="select variant-form-material" value={L4D2_GAME_ID}>
  {#each gameIds as gameId}
    {@const gameLabel = games['550'].label}
    <option value={+gameId}>{gameLabel}</option>
  {/each}
</select>
