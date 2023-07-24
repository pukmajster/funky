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

import assets from './assets/550'

export const game550: Game = {
  appId: 550,
  label: 'Left 4 Dead 2',
  rootDirectoryName: 'Left 4 Dead 2',
  gameDirectory: 'left4dead2',
  gameLogo: assets.game,
  addons: {
    addonFoldes: ['/left4dead2/addons', '/left4dead2/custom', '/left4dead2/addons/workshop'],
    supportsWorkshop: true,
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
            id: 'magnum',
            label: 'Deagle',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('magnum', 'desert_eagle', 'desert_eagle')
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
            id: 'smg_silenced',
            label: 'SMG Silenced',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('smg_silenced', 'smg_a', 'silenced_smg')
            }
          },
          {
            id: 'shotgun_chrome',
            label: 'Chrome Shotgun',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('shotgun_chrome', 'pumpshotgun_a', 'shotgun_chrome')
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
            id: 'rifle_ak47',
            label: 'AK-47',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('rifle_ak47', 'rifle_ak47', 'rifle_ak47')
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
            id: 'rifle_desert',
            allowSingleAddonRandomization: true,
            label: 'SCAR',
            matches: {
              files: [],
              references: genericGunFiles('rifle_desert', 'desert_rifle', 'desert_rifle')
            }
          },
          {
            id: 'auto_shotgun_spas',
            label: 'SPAS-12',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('auto_shotgun_spas', 'shotgun_spas', 'shotgun_spas')
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
            id: 'sniper_military',
            label: 'Military Sniper',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('sniper_military', 'sniper_military', 'sniper_military')
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
          },
          {
            id: 'awp',
            label: 'CSS AWP',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('awp', 'sniper_awp', 'snip_awp')
            }
          },
          {
            id: 'scout',
            label: 'CSS Scout',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('scout', 'sniper_scout', 'snip_scout')
            }
          },
          {
            id: 'mp5navy',
            label: 'CSS MP5',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('mp5navy', 'smg_mp5', 'smg_mp5')
            }
          },
          {
            id: 'sg552',
            label: 'CSS Krieg / SG552',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('sg552', 'rifle_sg552', 'rif_sg552')
            }
          },
          {
            id: 'grenade_launcher',
            label: 'Grenade Launcher',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericGunFiles('grenade_launcher', 'grenade_launcher', 'grenade_launcher'), // Grenade launcher
                ...genericGunFiles('grenade_launcher', 'he_grenade', 'grenade_launcher') // Grenade
              ]
            }
          },
          {
            id: 'machinegun_m60',
            label: '  M60 Machine Gun',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('machinegun_m60', 'm60', 'm60')
            }
          }
        ]
      },
      {
        id: 'melee',
        label: 'Melee',
        //imageUrl: IconMelee,
        image: assets.melee,
        subCategories: [
          {
            id: 'machete',
            label: 'Machete',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('machete', 'machete', 'machete')
            }
          },
          {
            id: 'bat',
            label: 'Bat',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('bat', 'bat', 'bat')
            }
          },
          {
            id: 'cricketbat',
            label: 'Cricket Bat',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('cricketbat', 'cricket_bat', 'cricket_bat')
            }
          },
          {
            id: 'axe',
            label: 'Axe',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('axe', 'fireaxe', 'fireaxe')
            }
          },
          {
            id: 'crowbar',
            label: 'Crowbar',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('crowbar', 'crowbar', 'crowbar')
            }
          },
          {
            id: 'guitar',
            label: 'Guitar',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('guitar', 'electric_guitar', 'electric_guitar')
            }
          },
          {
            id: 'shovel',
            label: 'Shovel',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('shovel', 'shovel', 'shovel')
            }
          },
          {
            id: 'katana',
            label: 'Katana',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('katana', 'katana', 'katana')
            }
          },
          {
            id: 'frying_pan',
            label: 'Frying Pan',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('pan', 'frying_pan', 'frying_pan')
            }
          },
          {
            id: 'golf_club',
            label: 'Golf Club',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('golf_club', 'golfclub', 'golfclub')
            }
          },
          {
            id: 'tonfa',
            label: 'Tonfa',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('tonfa', 'tonfa', 'tonfa')
            }
          },
          {
            id: 'pitchfork',
            label: 'Pitchfork',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('pitchfork', 'pitchfork', 'pitchfork')
            }
          },
          {
            id: 'knife',
            label: 'CSS Knife',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                'sound/weapons/knife/melee',
                'models/w_models/weapons/w_knife_t.',
                'models/v_models/v_knife_t.'
              ]
            }
          }
        ]
      },
      {
        id: 'utils',
        label: 'Utils',
        //imageUrl: IconUtils,
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
            id: 'defibrillator',
            label: 'Defibrillator',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['defibrillator']
            }
          },
          {
            id: 'adrenaline',
            label: 'Adrenaline',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                'sound/weapons/adrenaline/',
                'models/v_models/v_adrenaline',
                'w_eq_adrenaline'
              ]
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
          },
          {
            id: 'bile_flask',
            label: 'Boomer Bile',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('bile_flask')
            }
          },
          {
            id: 'incendiary_ammo',
            label: 'Incendiary Ammo',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['incendiary_ammo']
            }
          },
          {
            id: 'explosive_ammopack',
            label: 'Explosive Ammo',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['explosive_ammopack']
            }
          },
          {
            id: 'laser_pack',
            label: 'Laser Sight',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['laser_pack']
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
            id: 'gambler',
            label: 'Nick',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSurvivorFiles('gambler'),
                ...genericSurvivorVguiFiles('gambler')
              ]
            }
          },
          {
            id: 'mechanic',
            label: 'Ellis',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSurvivorFiles('mechanic'),
                ...genericSurvivorVguiFiles('mechanic')
              ]
            }
          },
          {
            id: 'coach',
            label: 'Coach',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [...genericSurvivorFiles('coach'), ...genericSurvivorVguiFiles('coach')]
            }
          },
          {
            id: 'producer',
            label: 'Rochelle',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSurvivorFiles('producer'),
                ...genericSurvivorVguiFiles('producer')
              ]
            }
          },
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
          // {
          //   id: 'smoker_l4d1',
          //   label: 'smoker_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('smoker')
          //   }
          // },
          // {
          //   id: 'boomer_l4d1',
          //   label: 'boomer_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('smoker')
          //   }
          // },
          // {
          //   id: 'witch_l4d1',
          //   label: 'witch_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('smoker')
          //   }
          // },
          // {
          //   id: 'tank_l4d1',
          //   label: 'tank_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: [
          //       ...genericSpecialInfectedL4D1Files('tank'),
          //       ...genericSpecialInfectedL4D1Files('hulk')
          //     ]
          //   }
          // },
          // {
          //   id: 'jockey_l4d1',
          //   label: 'jockey_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('jockey')
          //   }
          // },
          // {
          //   id: 'charger_l4d1',
          //   label: 'charger_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('charger')
          //   }
          // },
          // {
          //   id: 'spitter_l4d1',
          //   label: 'spitter_l4d1',
          //   allowSingleAddonRandomization: true,
          //   matches: {
          //     files: [],
          //     references: genericSpecialInfectedL4D1Files('spitter')
          //   }
          // },
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
            id: 'jockey',
            label: 'Jockey',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('jockey')
            }
          },
          {
            id: 'charger',
            label: 'Charger',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('charger')
            }
          },
          {
            id: 'spitter',
            label: 'Spitter',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('spitter')
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
            id: 'boomette',
            label: 'Boomette',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('boomette')
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
            id: 'gnome',
            label: 'Gnome',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['gnome']
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
            id: 'lil_peanut',
            label: "Lil' Peanut",
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ["lil'peanut_cutout001"]
            }
          },
          {
            id: 'xdr',
            label: 'xdR Animations',
            matches: {
              files: [],
              references: ['xdreanims']
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
