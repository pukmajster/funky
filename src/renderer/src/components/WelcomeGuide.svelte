<script>
  import { Step, Stepper } from '@skeletonlabs/skeleton'

  import SetupImageSteam from '../assets/welcome-steam.png'
  import { userStore } from '../stores/user'
  import SteamGamesDirectoryManager from './SteamGamesDirectoryManager.svelte'

  let lockStep = false

  function finishSetup() {
    $userStore.hasFinishedFirstTimeSetup = true
  }
</script>

<div class="max-w-[800px] w-full max-h-screen overflow-y-auto p-5 mx-auto">
  <h2 class="h2 mb-12">SOURCEBOX SETUP</h2>

  <Stepper on:complete={finishSetup}>
    <Step>
      <svelte:fragment slot="header">Welcome to Keith!</svelte:fragment>

      <p>
        Thanks for installing Keith! It's still in early development, so bugs are very like to
        occur. <br /><br /> Once you finish the setup, you'll find a "help" button in the top right corner
        of the app, where you'll have instructions on how to send any feedback. Now let's start the setup!
      </p>
    </Step>

    <Step locked={lockStep}>
      <svelte:fragment slot="header">Steam games directory</svelte:fragment>

      <p>
        Keith needs the directory of all your games to build a list of installed mods. This list is
        refreshed everytime you launch Keith, but you can also manually trigger the refresh from
        settings, if you've since installed new mods you're still not seeing in Keith.
      </p>

      <p>
        To find this directory, open Steam settings and go to the Storage tab. There click on the
        button with three dots and click "Browse Folder". Copy the location of the opened folder
        into the textbox below!
      </p>

      <img src={SetupImageSteam} class="shadow-lg rounded-sm" alt="Steam Storage" />

      <div class="space-y-1">
        <p>
          The end of the directory should look like this:
          <span class="pl-4 font-bold"
            ><span class="opacity-50 font-normal">...</span>/Steam/steamapps</span
          >
        </p>
        <SteamGamesDirectoryManager bind:lockStep />
      </div>
    </Step>

    <Step>
      <svelte:fragment slot="header">That's it!</svelte:fragment>

      <p>You're good to go! Enjoy :D</p>
    </Step>
  </Stepper>
</div>
