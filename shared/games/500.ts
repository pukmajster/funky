import { type Game } from '../game'

function genericGunFiles(soundId: string, worldId: string, viewmodelId: string): string[] {
  return [
    `sound/weapons/${soundId}/`,
    `models/w_models/weapons/w_${worldId}.`,
    `models/v_models/v_${viewmodelId}.`
  ]
}

function genericMeleeFiles(soundId: string, worldId: string, viewmodelId: string): string[] {
  return [
    `sound/weapons/${soundId}/`,
    `models/weapons/melee/w_${worldId}.`,
    `models/weapons/melee/v_${viewmodelId}.`
  ]
}

function genericSurvivorFiles(id: string): string[] {
  return [`models/survivors/survivor_${id}.`, `/survivors/${id}/`]
}

function genericSurvivorVguiFiles(id: string): string[] {
  return [`materials/vgui/s_panel_lobby_${id}.`, `materials/vgui/s_panel_${id}.`]
}

// function genericSpecialInfectedL4D1Files(id: string): string[] {
//   return [
//     `models/v_models/weapons/v_claw_${id}_l4d1.`,
//     `models/infected/${id}_l4d1.`,
//     `models/infected/${id}_l4d1`
//   ]
// }

function genericSpecialInfectedFiles(id: string): string[] {
  return [
    `models/v_models/weapons/v_claw_${id}.`,
    `models/infected/${id}.`,
    `models/infected/${id}`,
    `sound/npc/${id}/voice`,
    `sound/player/${id}/voice`
  ]
}

// function genericLoadingScreenFiles(id: string): string[] {
//   return [`materials/vgui/loadingscreen_${id}`]
// }

function genericNadeFiles(id: string): string[] {
  return [`models/w_models/weapons/w_eq_${id}.`, `models/v_models/v_${id}.`]
}

// import IconGuns from './550icons/guns.png'
// import IconInfected from './550icons/infected.png'
// import IconMelee from './550icons/melee.png'
// import IconMisc from './550icons/misc.png'
// import IconSurvivors from './550icons/survivors.png'
// import IconUtils from './550icons/utils.png'

// import gameLogo from './550icons/icon_l4d.png'

import assets from './assets/l4dassets'

export const game500: Game = {
  appId: 500,
  label: 'Left 4 Dead',
  rootDirectoryName: 'left 4 dead',
  gameDirectory: 'left4dead',
  gameLogo: assets.l4d1logo,
  addons: {
    addonFoldes: ['/left4dead/addons'],
    supportsWorkshop: false,
    categories: [
      {
        id: 'guns',
        label: 'Guns',
        //imageUrl: IconGuns,
        image: assets.guns,
        subCategories: [
          {
            id: 'pistol',
            label: 'Pistol',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericGunFiles('pistol', 'pistol_b', 'pistola'), // Single pistol
                ...genericGunFiles('dual_pistol', 'pistol_a', 'dual_pistola'), // Dual pistols
                ...genericGunFiles('dual_pistol', 'pistol_a_dual', 'pistol_a_dual') // Dual pistols
              ]
            }
          },

          {
            id: 'smg',
            label: 'SMG',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('smg', 'smg_uzi', 'smg')
            }
          },

          {
            id: 'shotgun_pump',
            label: 'Pump Shotgun',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('shotgun', 'shotgun', 'pumpshotgun')
            }
          },

          {
            id: 'rifle_m16a2',
            allowSingleAddonRandomization: true,
            label: 'M16',
            matches: {
              files: [],
              references: genericGunFiles('rifle', 'rifle_m16a2', 'rifle')
            }
          },

          {
            id: 'auto_shotgun',
            label: 'Auto Shotgun',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('auto_shotgun', 'autoshot_m4super', 'autoshotgun')
            }
          },

          {
            id: 'hutning_rifle',
            label: 'Hunter Rifle',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('hunting_rifle', 'sniper_mini14', 'huntingrifle')
            }
          }
        ]
      },
      {
        id: 'utils',
        label: 'Utils',
        image: assets.utils,
        subCategories: [
          {
            id: 'medkit',
            label: 'Medkit',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                'sound/player/survivor/heal/bandaging_1',
                'sound/player/survivor/bandaging_1',
                'w_eq_medkit',
                'v_medkit'
              ]
            }
          },
          {
            id: 'painpills',
            label: 'Pain Pills',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['pain_pills/pills_deploy_', 'w_eq_painpills', 'v_painpills']
            }
          },

          {
            id: 'molotov',
            label: 'Molotov',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('molotov')
            }
          },
          {
            id: 'pipebomb',
            label: 'Pipebomb',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('pipebomb')
            }
          }
        ]
      },
      {
        id: 'survivors',
        label: 'Survivors',
        //imageUrl: IconSurvivors,
        image: assets.survivors,
        subCategories: [
          {
            id: 'teenangst',
            label: 'Zoey',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSurvivorFiles('teenangst'),
                ...genericSurvivorVguiFiles('teenangst')
              ]
            }
          },
          {
            id: 'manager',
            label: 'Louis',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSurvivorFiles('manager'),
                ...genericSurvivorVguiFiles('manager')
              ]
            }
          },
          {
            id: 'biker',
            label: 'Francis',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [...genericSurvivorFiles('biker'), ...genericSurvivorVguiFiles('biker')]
            }
          },
          {
            id: 'namvet',
            label: 'Bill',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [...genericSurvivorFiles('namvet'), ...genericSurvivorVguiFiles('namvet')]
            }
          }
        ]
      },
      {
        id: 'infected',
        label: 'Infected',
        image: assets.infected,
        //imageUrl: IconInfected,
        subCategories: [
          {
            id: 'common_infected',
            label: 'Common Infected',
            matches: {
              files: [],
              references: ['infected/common/']
            }
          },
          {
            id: 'smoker',
            label: 'Smoker',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('smoker')
            }
          },
          {
            id: 'hunter',
            label: 'Hunter',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('hunter')
            }
          },
          {
            id: 'boomer',
            label: 'Boomer',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('boomer')
            }
          },
          {
            id: 'witch',
            label: 'Witch',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('witch')
            }
          },
          {
            id: 'tank',
            label: 'Tank',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSpecialInfectedFiles('tank'),
                ...genericSpecialInfectedFiles('hulk')
              ]
            }
          }
        ]
      },
      {
        id: 'misc',
        label: 'Misc',
        image: assets.misc,
        //imageUrl: IconMisc,
        subCategories: [
          {
            id: 'ui',
            label: 'UI',
            matches: {
              files: [],
              references: ['materials/vgui/hud/']
            }
          },
          {
            id: 'vgui',
            label: 'VGUI',
            matches: {
              files: [],
              references: ['materials/vgui/']
            }
          },
          {
            id: 'vscript',
            label: 'VScript',
            matches: {
              files: [],
              references: ['vscripts']
            }
          },
          {
            id: 'color_correction',
            label: 'Color Correction',
            matches: {
              files: [],
              references: ['/correction/']
            }
          },
          {
            id: 'skybox',
            label: 'Skybox',
            matches: {
              files: [],
              references: ['materials/skybox']
            }
          },
          {
            id: 'props',
            label: 'Props',
            matches: {
              files: [],
              references: ['materials/models/props/', 'models/props']
            }
          },
          {
            id: 'particles',
            label: 'Particles',
            matches: {
              files: [],
              references: ['.pcf']
            }
          },
          {
            id: 'vehicles',
            label: 'Vehicles',
            matches: {
              files: [],
              references: ['/props_vehicles/']
            }
          },
          {
            id: 'jukebox',
            label: 'Jukebox',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['flu/jukebox/', 'jukebox01']
            }
          },
          {
            id: 'voice',
            label: 'Voice',
            matches: {
              files: [],
              references: ['voice']
            }
          },
          {
            id: 'music',
            label: 'Music',
            matches: {
              files: [],
              references: ['music']
            }
          },
          {
            id: 'water',
            label: 'Water',
            matches: {
              files: [],
              references: ['/liquids/water']
            }
          },
          {
            id: 'flashlight',
            label: 'Flashlight',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['materials/effects/flashlight']
            }
          },
          {
            id: 'spray',
            label: 'Spray',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['scripts/sprays_manifest.txt', 'materials/vgui/logos']
            }
          },
          {
            id: 'ammo_stack',
            label: 'Ammo Stack',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['ammo_stack', 'coffeeammo']
            }
          },
          {
            id: 'medical_cabinet',
            label: 'Medical Cabinet',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['/props_interiors/medicalcabinet']
            }
          },
          {
            id: 'loading_screen',
            label: 'Loading Screens',
            matches: {
              files: [],
              references: [`materials/vgui/loadingscreen_`]
            }
          }
        ]
      }
    ]
  }
}
