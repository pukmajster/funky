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

<div class="w-full max-h-screen overflow-y-auto p-5 mx-auto">
  <div class="max-w-[800px] w-full mx-auto">
    <h2 class="h2 mb-12">FUNKY SETUP</h2>

    <Stepper on:complete={finishSetup}>
      <Step>
        <svelte:fragment slot="header">Welcome to Funky!</svelte:fragment>

        <p>
          Thanks for installing Funky, the funkiest mod manager for Left 4 Dead 2 there is! It's
          still in early development, so bugs are very like to occur and new features are still
          being cooked. <br /><br />
          Now, before you can actually start using Funky, you just need to go through a quick setup.
          Trust me, it's short!
        </p>
      </Step>

      <Step locked={lockStep}>
        <svelte:fragment slot="header">Steam games directory</svelte:fragment>

        <p>
          Funky needs the directory to your Steam games in order to build a list of all installed
          mods. This list is refreshed everytime you launch Funky, but you can also manually trigger
          the refresh at any time, if you've since installed new mods you're still not seeing in
          Funky.
        </p>

        <p>
          To find this directory, open Steam settings and go to the Storage tab, or click on the
          button below. From there, click on the button with three dots and click "Browse Folder".
          Copy the location of the opened folder into the textbox below.
        </p>

        <a class="btn variant-filled-surface !border-none" href="steam://settings/storage"
          >Open Steam Storage Settings</a
        >

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
        <svelte:fragment slot="header">Setup Finished!</svelte:fragment>

        <p>
          See? I told you it was gonna be quick.<br /><br />Feedback is, of course, highly
          appreciated, and you can provide said feedback by visiting the GitHub page, of which
          you'll find a link to in the About menu.
          <br /><br />
          That's it! <strong>Enjoy!</strong>
        </p>
      </Step>
    </Stepper>
  </div>
</div>
