<script>
  import { Step, Stepper } from '@skeletonlabs/skeleton'
  import SetupImageSteam from '../../assets/welcome-steam.png'
  import SteamGamesDirectoryManager from '../../components/SteamGamesDirectoryManager.svelte'
  import { readAddonList } from '../../api/api'
  import { userStore } from '../../stores/user'
  import { requestManifest } from '../../stores/manifest'

  let lockStep = false

  async function finishSetup() {
    $userStore.hasFinishedFirstTimeSetup = true
    await requestManifest('full-update')
    if (importModsAfterSetup) readAddonList()
  }

  let importModsAfterSetup = true

  const importOptions = [
    {
      label: 'Yes, I want to import my mod list',
      value: true
    },
    {
      label: "No, I don't want to import my mod list",
      value: false
    }
  ]
</script>

<div class="w-full max-h-screen overflow-y-auto p-5 mx-auto">
  <div class="max-w-[800px] w-full mx-auto">
    <h2 class="h2 mb-12">FUNKY SETUP</h2>

    <Stepper on:complete={finishSetup}>
      <Step>
        <svelte:fragment slot="header">WELCOME TO FUNKY!</svelte:fragment>

        <p class=" pb-24">
          Thanks for installing Funky! It's still in early development, so bugs are very likely to
          occur and new features are still being cooked. <br /><br />
          Now, before you can actually start using Funky, you just need to go through a quick setup.
          Trust me, it's short!
        </p>
      </Step>

      <Step locked={lockStep}>
        <svelte:fragment slot="header">STEAM GAMES DIRECTORY</svelte:fragment>

        <p>
          Funky needs to know where Left 4 Dead 2 is installed in order to build a list of all
          installed mods. This list is refreshed everytime you launch Funky, but you can also
          manually trigger the refresh at any time, if you've since installed new mods you're still
          not seeing in Funky.
        </p>

        <p>
          To find this directory, open Steam settings and go to the Storage tab, or click on the
          button below, and select the drive where the game is installed. From there, click on the
          button with three dots and click "Browse Folder". Copy the location of the opened folder
          into the textbox below.
        </p>

        <a class="btn variant-filled-surface !border-none" href="steam://settings/storage"
          >Open Steam Storage Settings</a
        >

        <img src={SetupImageSteam} class="shadow-lg rounded-sm max-w-lg" alt="Steam Storage" />

        <div class="space-y-1 pb-16">
          <p>
            The end of the directory should look like this:
            <span class="pl-4 font-bold">
              <span class="opacity-50 font-normal">...</span>
              /steamapps
            </span>
          </p>

          <SteamGamesDirectoryManager hideSteamStorageButton />
        </div>
      </Step>

      <Step>
        <svelte:fragment slot="header">IMPORT MOD LIST</svelte:fragment>

        <p>Do you want to import your current selection of enabled mods from Left 4 Dead 2?</p>

        <div class="flex flex-col gap-4 max-w-md pb-24">
          {#each importOptions as option}
            <button
              data-active={importModsAfterSetup == option.value}
              class="p-4 flex items-center justify-between text-left border border-surface-600 bg-surface-900 rounded-lg transition-colors data-[active=true]:border-primary-500 data-[active=true]:bg-surface-700 data-[active=true]:font-bold"
              on:click={() => (importModsAfterSetup = option.value)}
            >
              {option.label}

              {#if importModsAfterSetup == option.value}
                <span class="text-primary-500">Selected</span>
              {/if}
            </button>
          {/each}
        </div>
      </Step>

      <Step>
        <svelte:fragment slot="header">SETUP FINISHED!</svelte:fragment>

        <p>
          See? I told you it was gonna be quick.<br /><br />Feedback is, of course, highly
          appreciated. You can provide said feedback by visiting the GitHub page, of which you'll
          find a link to in settings or the help menu.
          <br /><br />
          That's it! <strong>Enjoy!</strong>
        </p>
      </Step>
    </Stepper>
  </div>
</div>
