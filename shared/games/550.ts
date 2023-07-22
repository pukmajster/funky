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

function genericSpecialInfectedL4D1Files(id: string): string[] {
  return [
    `models/v_models/weapons/v_claw_${id}_l4d1.`,
    `models/infected/${id}_l4d1.`,
    `models/infected/${id}_l4d1`
  ]
}

function genericSpecialInfectedFiles(id: string): string[] {
  return [
    `models/v_models/weapons/v_claw_${id}.`,
    `models/infected/${id}.`,
    `models/infected/${id}`,
    `sound/npc/${id}/voice`,
    `sound/player/${id}/voice`
  ]
}

function genericLoadingScreenFiles(id: string): string[] {
  return [`materials/vgui/loadingscreen_${id}`]
}

function genericNadeFiles(id: string): string[] {
  return [`models/w_models/weapons/w_eq_${id}.`, `models/v_models/v_${id}.`]
}

import IconGuns from './550icons/guns.png'
import IconInfected from './550icons/infected.png'
import IconMelee from './550icons/melee.png'
import IconMisc from './550icons/misc.png'
import IconSurvivors from './550icons/survivors.png'
import IconUtils from './550icons/utils.png'

export const game550: Game = {
  appId: 550,
  label: 'Left 4 Dead 2',
  rootDirectoryName: 'Left 4 Dead 2',
  gameDirectory: 'left4dead2',
  addons: {
    addonFoldes: ['/left4dead2/addons', '/left4dead2/custom', '/left4dead2/addons/workshop'],
    supportsWorkshop: true,
    categories: [
      {
        id: 'guns',
        label: 'guns',
        imageUrl: IconGuns,
        subCategories: [
          {
            id: 'rifle_ak47',
            label: 'AK47',
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
            id: 'sniper_military',
            label: 'sniper_military',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('sniper_military', 'sniper_military', 'sniper_military')
            }
          },
          {
            id: 'hutning_rifle',
            label: 'hutning_rifle',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('hunting_rifle', 'sniper_mini14', 'huntingrifle')
            }
          },
          {
            id: 'awp',
            label: 'awp',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('awp', 'sniper_awp', 'snip_awp')
            }
          },
          {
            id: 'shotgun_chrome',
            label: 'shotgun_chrome',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('shotgun_chrome', 'pumpshotgun_a', 'shotgun_chrome')
            }
          },
          {
            id: 'shotgun_pump',
            label: 'shotgun_pump',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('shotgun', 'shotgun', 'pumpshotgun')
            }
          },
          {
            id: 'sg552',
            label: 'sg552',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('sg552', 'rifle_sg552', 'rif_sg552')
            }
          },
          {
            id: 'auto_shotgun_spas',
            label: 'SCauto_shotgun_spasAR',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('auto_shotgun_spas', 'shotgun_spas', 'shotgun_spas')
            }
          },
          {
            id: 'smg_silenced',
            label: 'smg_silenced',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('smg_silenced', 'smg_a', 'silenced_smg')
            }
          },
          {
            id: 'smg',
            label: 'smg',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('smg', 'smg_uzi', 'smg')
            }
          },
          {
            id: 'mp5navy',
            label: 'mp5navy',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('mp5navy', 'smg_mp5', 'smg_mp5')
            }
          },
          {
            id: 'scout',
            label: 'scout',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('scout', 'sniper_scout', 'snip_scout')
            }
          },
          {
            id: 'grenade_launcher',
            label: 'grenade_launcher',
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
            id: 'auto_shotgun',
            label: 'auto_shotgun',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericGunFiles('auto_shotgun', 'autoshot_m4super', 'autoshotgun')
            }
          },
          {
            id: 'machinegun_m60',
            label: 'machinegun_m60',
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
        label: 'melee',
        imageUrl: IconMelee,
        subCategories: [
          {
            id: 'machete',
            label: 'machete',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('machete', 'machete', 'machete')
            }
          },
          {
            id: 'bat',
            label: 'bat',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('bat', 'bat', 'bat')
            }
          },
          {
            id: 'cricketbat',
            label: 'cricketbat',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('cricketbat', 'cricket_bat', 'cricket_bat')
            }
          },
          {
            id: 'axe',
            label: 'axe',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('axe', 'fireaxe', 'fireaxe')
            }
          },
          {
            id: 'crowbar',
            label: 'crowbar',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('crowbar', 'crowbar', 'crowbar')
            }
          },
          {
            id: 'guitar',
            label: 'guitar',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('guitar', 'electric_guitar', 'electric_guitar')
            }
          },
          {
            id: 'shovel',
            label: 'shovel',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('shovel', 'shovel', 'shovel')
            }
          },
          {
            id: 'katana',
            label: 'katana',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('katana', 'katana', 'katana')
            }
          },
          {
            id: 'frying_pan',
            label: 'sefsefsefrying_panfs',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('pan', 'frying_pan', 'frying_pan')
            }
          },
          {
            id: 'golf_club',
            label: 'golf_club',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('golf_club', 'golfclub', 'golfclub')
            }
          },
          {
            id: 'tonfa',
            label: 'tonfa',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('tonfa', 'tonfa', 'tonfa')
            }
          },
          {
            id: 'pitchfork',
            label: 'pitchfork',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericMeleeFiles('pitchfork', 'pitchfork', 'pitchfork')
            }
          },
          {
            id: 'knife',
            label: 'knife',
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
        label: 'utils',
        imageUrl: IconUtils,
        subCategories: [
          {
            id: 'medkit',
            label: 'medkit',
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
            label: 'painpills',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['pain_pills/pills_deploy_', 'w_eq_painpills', 'v_painpills']
            }
          },
          {
            id: 'defibrillator',
            label: 'defibrillator',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['defibrillator']
            }
          },
          {
            id: 'adrenaline',
            label: 'adrenaline',
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
            label: 'molotov',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('molotov')
            }
          },
          {
            id: 'pipebomb',
            label: 'pipebomb',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('pipebomb')
            }
          },
          {
            id: 'bile_flask',
            label: 'bile_flask',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericNadeFiles('bile_flask')
            }
          },
          {
            id: 'incendiary_ammo',
            label: 'incendiaryincendiary_ammo_ammopack',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['incendiary_ammo']
            }
          },
          {
            id: 'explosive_ammopack',
            label: 'explosive_ammopack',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['explosive_ammopack']
            }
          },
          {
            id: 'laser_pack',
            label: 'laser_pack',
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
        label: 'survivors',
        imageUrl: IconSurvivors,
        subCategories: [
          {
            id: 'gambler',
            label: 'gambler',
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
            label: 'mechanic',
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
            label: 'coach',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [...genericSurvivorFiles('coach'), ...genericSurvivorVguiFiles('coach')]
            }
          },
          {
            id: 'producer',
            label: 'producer',
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
            label: 'teenangst',
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
            label: 'manager',
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
            label: 'biker',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [...genericSurvivorFiles('biker'), ...genericSurvivorVguiFiles('biker')]
            }
          },
          {
            id: 'namvet',
            label: 'namvet',
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
        imageUrl: IconInfected,
        subCategories: [
          {
            id: 'common_infected',
            label: 'common_infected',
            matches: {
              files: [],
              references: ['infected/common/']
            }
          },
          {
            id: 'smoker_l4d1',
            label: 'smoker_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('smoker')
            }
          },
          {
            id: 'boomer_l4d1',
            label: 'boomer_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('smoker')
            }
          },
          {
            id: 'witch_l4d1',
            label: 'witch_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('smoker')
            }
          },
          {
            id: 'tank_l4d1',
            label: 'tank_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSpecialInfectedL4D1Files('tank'),
                ...genericSpecialInfectedL4D1Files('hulk')
              ]
            }
          },
          {
            id: 'jockey_l4d1',
            label: 'jockey_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('jockey')
            }
          },
          {
            id: 'charger_l4d1',
            label: 'charger_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('charger')
            }
          },
          {
            id: 'spitter_l4d1',
            label: 'spitter_l4d1',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedL4D1Files('spitter')
            }
          },
          {
            id: 'smoker',
            label: 'smoker',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('smoker')
            }
          },
          {
            id: 'hunter',
            label: 'hunter',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('hunter')
            }
          },
          {
            id: 'boomer',
            label: 'boomer',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('boomer')
            }
          },
          {
            id: 'witch',
            label: 'witch',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('witch')
            }
          },
          {
            id: 'tank',
            label: 'tank',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: [
                ...genericSpecialInfectedFiles('tank'),
                ...genericSpecialInfectedFiles('hulk')
              ]
            }
          },
          {
            id: 'jockey',
            label: 'jockey',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('jockey')
            }
          },
          {
            id: 'charger',
            label: 'charger',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('charger')
            }
          },
          {
            id: 'spitter',
            label: 'spitter',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('spitter')
            }
          },
          {
            id: 'boomette',
            label: 'boomette',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: genericSpecialInfectedFiles('boomette')
            }
          }
        ]
      },
      {
        id: 'misc',
        label: 'misc',
        imageUrl: IconMisc,
        subCategories: [
          {
            id: 'ui',
            label: 'ui',
            matches: {
              files: [],
              references: ['materials/vgui/hud/']
            }
          },
          {
            id: 'vgui',
            label: 'vgui',
            matches: {
              files: [],
              references: ['materials/vgui/']
            }
          },
          {
            id: 'vscript',
            label: 'vscript',
            matches: {
              files: [],
              references: ['vscripts']
            }
          },
          {
            id: 'color_correction',
            label: 'color_correction',
            matches: {
              files: [],
              references: ['/correction/']
            }
          },
          {
            id: 'skybox',
            label: 'skybox',
            matches: {
              files: [],
              references: ['materials/skybox']
            }
          },
          {
            id: 'props',
            label: 'props',
            matches: {
              files: [],
              references: ['materials/models/props/', 'models/props']
            }
          },
          {
            id: 'particles',
            label: 'particles',
            matches: {
              files: [],
              references: ['.pcf']
            }
          },
          {
            id: 'gnome',
            label: 'gnome',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['gnome']
            }
          },
          {
            id: 'vehicles',
            label: 'vehicles',
            matches: {
              files: [],
              references: ['/props_vehicles/']
            }
          },
          {
            id: 'jukebox',
            label: 'jukebox',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['flu/jukebox/', 'jukebox01']
            }
          },
          {
            id: 'voice',
            label: 'voice',
            matches: {
              files: [],
              references: ['voice']
            }
          },
          {
            id: 'music',
            label: 'music',
            matches: {
              files: [],
              references: ['music']
            }
          },
          {
            id: 'water',
            label: 'water',
            matches: {
              files: [],
              references: ['/liquids/water']
            }
          },
          {
            id: 'flashlight',
            label: 'flashlight',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['materials/effects/flashlight']
            }
          },
          {
            id: 'spray',
            label: 'spray',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['scripts/sprays_manifest.txt', 'materials/vgui/logos']
            }
          },
          {
            id: 'ammo_stack',
            label: 'ammo_stack',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['ammo_stack', 'coffeeammo']
            }
          },
          {
            id: 'medical_cabinet',
            label: 'medical_cabinet',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ['/props_interiors/medicalcabinet']
            }
          },
          {
            id: 'lil_peanut',
            label: 'lil_peanut',
            allowSingleAddonRandomization: true,
            matches: {
              files: [],
              references: ["lil'peanut_cutout001"]
            }
          },
          {
            id: 'xdr',
            label: 'xdr',
            matches: {
              files: [],
              references: ['xdreanims']
            }
          },
          {
            id: 'loading_screen',
            label: 'loading_screen',
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
