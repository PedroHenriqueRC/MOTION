import type { Car, Brand, Story, Collection } from './models'

const image = (url: string) => url

export const cars: (Car & { valueUsd: number })[] = [
  {
    id: '1',
    slug: 'porsche-911-gt3',
    name: '911 GT3',
    brand: 'Porsche',
    year: 2021,
    valueUsd: 180000,
    image: image('/images/cars/porsche-911.jpg'),
    description: 'Sensação orientada para pista com comportamento dinâmico e preciso.',
    specs: {
      engine: '4.0L Flat-6 (naturally aspirated)',
      power: '502 hp',
      torque: '469 Nm',
      transmission: '7-speed PDK',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.4s',
      topSpeed: '318 km/h'
    }
  },
  {
    id: '2',
    slug: 'nissan-skyline-r34',
    name: 'Skyline GT-R R34',
    brand: 'Nissan',
    year: 1999,
    valueUsd: 160000,
    image: image('/images/cars/nissan-gtr.jpg'),
    description: 'Desempenho e engenharia JDM icônicos.',
    specs: {
      engine: '2.6L I6 RB26DETT (twin-turbo)',
      power: '276 hp (JDM rated)',
      torque: '353 Nm',
      transmission: '6-speed manual',
      drivetrain: 'AWD (ATTESA E-TS)',
      acceleration: '0-100 km/h em ~5.6s',
      topSpeed: '250+ km/h'
    }
  },
  {
    id: '3',
    slug: 'bmw-m3-e46',
    name: 'M3 E46',
    brand: 'BMW',
    year: 2001,
    valueUsd: 55000,
    image: image('/images/cars/bmw-m3.jpg'),
    description: 'Chassi equilibrado e dinâmica extremamente precisa.',
    specs: {
      engine: '3.2L I6 S54',
      power: '333 hp',
      torque: '365 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.8s',
      topSpeed: '250 km/h (limitado)'
    }
  },
  {
    id: '4',
    slug: 'ferrari-f40',
    name: 'F40',
    brand: 'Ferrari',
    year: 1987,
    valueUsd: 2200000,
    image: image('/images/cars/ferrari-f40.jpg'),
    description: 'O último supercarro aprovado pessoalmente por Enzo Ferrari; purismo analógico em estado bruto.',
    specs: {
      engine: '2.9L V8 Twin-Turbo F120A',
      power: '471 hp',
      torque: '577 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.1s',
      topSpeed: '324 km/h'
    }
  },
  {
    id: '5',
    slug: 'audi-rs6-avant',
    name: 'RS6 Avant',
    brand: 'Audi',
    year: 2023,
    valueUsd: 125000,
    image: image('/images/cars/audi-rs6.jpg'),
    description: 'A perua definitiva que combina o conforto familiar com a aceleração de um supercarro.',
    specs: {
      engine: '4.0L V8 Twin-Turbo TFSI MHEV',
      power: '591 hp',
      torque: '800 Nm',
      transmission: '8-speed Tiptronic',
      drivetrain: 'AWD (quattro)',
      acceleration: '0-100 km/h em ~3.6s',
      topSpeed: '305 km/h'
    }
  },
  {
    id: '6',
    slug: 'mclaren-720s',
    name: '720S',
    brand: 'McLaren',
    year: 2020,
    valueUsd: 235000,
    image: image('/images/cars/mclaren-720s.jpg'),
    description: 'Aerodinâmica focado na performance com estrutura monocoque em fibra de carbono.',
    specs: {
      engine: '4.0L V8 Twin-Turbo M840T',
      power: '710 hp',
      torque: '770 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~2.9s',
      topSpeed: '341 km/h'
    }
  },
  {
    id: '7',
    slug: 'toyota-supra-mk4',
    name: 'Supra MK4 (A80)',
    brand: 'Toyota',
    year: 1993,
    valueUsd: 75000,
    image: image('/images/cars/toyota-supra-mk4.jpg'),
    description: 'Lenda do tuning japonês impulsionada pelo indestrutível bloco 2JZ.',
    specs: {
      engine: '3.0L I6 2JZ-GTE (twin-turbo)',
      power: '320 hp',
      torque: '427 Nm',
      transmission: '6-speed manual (Getrag V160)',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.9s',
      topSpeed: '250 km/h'
    }
  },
  {
    id: '8',
    slug: 'ford-gt40-mk2',
    name: 'GT40 Mk II',
    brand: 'Ford',
    year: 1966,
    valueUsd: 8500000,
    image: image('/images/cars/ford-gt40.jpg'),
    description: 'Desenvolvido especificamente para quebrar o domínio da Ferrari nas 24 Horas de Le Mans.',
    specs: {
      engine: '7.0L V8 FE 427 cu in',
      power: '485 hp',
      torque: '644 Nm',
      transmission: '4-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.0s',
      topSpeed: '330 km/h'
    }
  },
  {
    id: '9',
    slug: 'lamborghini-countach-lp400',
    name: 'Countach LP400',
    brand: 'Lamborghini',
    year: 1974,
    valueUsd: 700000,
    image: image('/images/cars/lamborghini-lp400.jpg'),
    description: 'O design "wedge" revolucionário que definiu o visual de supercarro dos anos 70 e 80.',
    specs: {
      engine: '3.9L V12 (naturally aspirated)',
      power: '370 hp',
      torque: '361 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~5.4s',
      topSpeed: '309 km/h'
    }
  },
  {
    id: '10',
    slug: 'chevrolet-corvette-c8-z06',
    name: 'Corvette C8 Z06',
    brand: 'Chevrolet',
    year: 2023,
    valueUsd: 120000,
    image: image('/images/cars/chevrolet-corvette-c8.jpg'),
    description: 'Motor central-traseiro com o V8 aspirado de virabrequim plano mais potente já produzido em série.',
    specs: {
      engine: '5.5L V8 LT6 (naturally aspirated)',
      power: '670 hp',
      torque: '623 Nm',
      transmission: '8-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~2.6s',
      topSpeed: '315 km/h'
    }
  },
  {
    id: '11',
    slug: 'mazda-rx7-fd',
    name: 'RX-7 FD3S',
    brand: 'Mazda',
    year: 1992,
    valueUsd: 50000,
    image: image('/images/cars/mazda-rx7.jpg'),
    description: 'Design atemporal e motor rotativo Wankel com turbo sequencial e peso extremamente reduzido.',
    specs: {
      engine: '1.3L Twin-Rotor 13B-REW (sequential twin-turbo)',
      power: '252 hp',
      torque: '294 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~5.1s',
      topSpeed: '250 km/h'
    }
  },
  {
    id: '12',
    slug: 'mercedes-amg-gt-black-series',
    name: 'AMG GT Black Series',
    brand: 'Mercedes-AMG',
    year: 2021,
    valueUsd: 350000,
    image: image('/images/cars/mercedes-amggt.jpg'),
    description: 'Extremismo aerodinâmico derivado diretamente do automobilismo da categoria GT3.',
    specs: {
      engine: '4.0L V8 Twin-Turbo M178 LS2',
      power: '720 hp',
      torque: '800 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.2s',
      topSpeed: '325 km/h'
    }
  },
  {
    id: '13',
    slug: 'subaru-impreza-22b-sti',
    name: 'Impreza 22B STi',
    brand: 'Subaru',
    year: 1998,
    valueUsd: 180000,
    image: image('/images/cars/subaru-imprenza.jpg'),
    description: 'Rara edição limitada comemorativa do tricampeonato de construtores no WRC.',
    specs: {
      engine: '2.2L Flat-4 EJ22G (turbocharged)',
      power: '276 hp',
      torque: '363 Nm',
      transmission: '5-speed manual',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~4.7s',
      topSpeed: '248 km/h'
    }
  },
  {
    id: '14',
    slug: 'aston-martin-dbs-superleggera',
    name: 'DBS Superleggera',
    brand: 'Aston Martin',
    year: 2019,
    valueUsd: 200000,
    image: image('/images/cars/astonmartin-dbs.jpg'),
    description: 'O Gran Turismo definitivo com torque massivo e elegância britânica inconfundível.',
    specs: {
      engine: '5.2L V12 Twin-Turbo',
      power: '715 hp',
      torque: '900 Nm',
      transmission: '8-speed automatic (ZF)',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.4s',
      topSpeed: '340 km/h'
    }
  },
  {
    id: '15',
    slug: 'honda-nsx-na1',
    name: 'NSX (NA1)',
    brand: 'Honda',
    year: 1990,
    valueUsd: 110000,
    image: image('/images/cars/honda-nsx.jpg'),
    description: 'Desenvolvido com ajuda de Ayrton Senna; provou que supercarros podem ser confiáveis e utilizáveis diariamente.',
    specs: {
      engine: '3.0L V6 C30A VTEC (naturally aspirated)',
      power: '270 hp',
      torque: '285 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~5.7s',
      topSpeed: '270 km/h'
    }
  },
  {
    id: '16',
    slug: 'audi-tt-rs-2023',
    name: 'TT RS (8S / Facelift)',
    brand: 'Audi',
    year: 2023,
    valueUsd: 65000,
    image: image('/images/cars/audi-tt-rs.jpg'),
    description: 'O ápice do icônico esportivo compacto da Audi, equipado com o lendário motor de 5 cilindros e tração integral quattro.',
    specs: {
      engine: '2.5L Turbo 5-cilindros TFSI',
      power: '400 hp',
      torque: '480 Nm',
      transmission: '7-speed S-tronic dual-clutch',
      drivetrain: 'AWD (quattro)',
      acceleration: '0-100 km/h em ~3.7s',
      topSpeed: '250 km/h (limitada eletronicamente)'
    }
  },
  {
    id: '17',
    slug: 'porsche-911-turbo-s',
    name: '911 Turbo S',
    brand: 'Porsche',
    year: 2024,
    valueUsd: 250000,
    image: image('/images/cars/porsche-911-turbo-s.jpg'),
    description: 'Desempenho de supercarro combinado à usabilidade diária, com tração integral e resposta brutal.',
    specs: {
      engine: '3.7L Flat-6 Twin-Turbo',
      power: '640 hp',
      torque: '800 Nm',
      transmission: '8-speed PDK',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~2.7s',
      topSpeed: '330 km/h'
    }
  },
  {
    id: '18',
    slug: 'porsche-911-gt3-rs',
    name: '911 GT3 RS',
    brand: 'Porsche',
    year: 2023,
    valueUsd: 388000,
    image: image('/images/cars/porsche-911-gt3-rs.jpg'),
    description: 'Aerodinâmica extrema e foco absoluto em desempenho de pista.',
    specs: {
      engine: '4.0L Flat-6 naturally aspirated',
      power: '518 hp',
      torque: '465 Nm',
      transmission: '7-speed PDK',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.2s',
      topSpeed: '296 km/h'
    }
  },
  {
    id: '19',
    slug: 'porsche-718-cayman-gt4-rs',
    name: '718 Cayman GT4 RS',
    brand: 'Porsche',
    year: 2022,
    valueUsd: 223000,
    image: image('/images/cars/porsche-718-cayman-gt4-rs.jpg'),
    description: 'Um dos esportivos compactos mais focados da Porsche, com motor aspirado e arquitetura central.',
    specs: {
      engine: '4.0L Flat-6 naturally aspirated',
      power: '493 hp',
      torque: '450 Nm',
      transmission: '7-speed PDK',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.4s',
      topSpeed: '315 km/h'
    }
  },
  {
    id: '20',
    slug: 'porsche-carrera-gt',
    name: 'Carrera GT',
    brand: 'Porsche',
    year: 2004,
    valueUsd: 1659000,
    image: image('/images/cars/porsche-carrera-gt.jpg'),
    description: 'Ícone analógico de baixa produção, conhecido pelo V10 aspirado e câmbio manual.',
    specs: {
      engine: '5.7L V10 naturally aspirated',
      power: '603 hp',
      torque: '590 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.9s',
      topSpeed: '330 km/h'
    }
  },
  {
    id: '21',
    slug: 'nissan-skyline-r32',
    name: 'Skyline GT-R R32',
    brand: 'Nissan',
    year: 1989,
    valueUsd: 51400,
    image: image('/images/cars/nissan-skyline-r32.jpg'),
    description: 'O GT-R que ajudou a definir a era dourada da performance japonesa e do sistema ATTESA.',
    specs: {
      engine: '2.6L I6 RB26DETT Twin-Turbo',
      power: '280 hp',
      torque: '353 Nm',
      transmission: '5-speed manual',
      drivetrain: 'AWD (ATTESA E-TS)',
      acceleration: '0-100 km/h em ~5.6s',
      topSpeed: '180 km/h (JDM limiter)'
    }
  },
  {
    id: '22',
    slug: 'nissan-skyline-r33',
    name: 'Skyline GT-R R33',
    brand: 'Nissan',
    year: 1995,
    valueUsd: 60000,
    image: image('/images/cars/nissan-skyline-r33.jpg'),
    description: 'Evolução do GT-R com chassi mais refinado e desempenho ainda mais competente.',
    specs: {
      engine: '2.6L I6 RB26DETT Twin-Turbo',
      power: '276 hp',
      torque: '368 Nm',
      transmission: '5-speed manual',
      drivetrain: 'AWD (ATTESA E-TS)',
      acceleration: '0-100 km/h em ~5.4s',
      topSpeed: '180 km/h (JDM limiter)'
    }
  },
  {
    id: '23',
    slug: 'nissan-gtr-r35',
    name: 'GT-R R35',
    brand: 'Nissan',
    year: 2024,
    valueUsd: 120000,
    image: image('/images/cars/nissan-gtr-r35.jpg'),
    description: 'O Godzilla moderno, combinando potência brutal, tração integral e tecnologia de alta performance.',
    specs: {
      engine: '3.8L V6 Twin-Turbo VR38DETT',
      power: '565 hp',
      torque: '633 Nm',
      transmission: '6-speed dual-clutch',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~2.7s',
      topSpeed: '315 km/h'
    }
  },
  {
    id: '24',
    slug: 'bmw-m3-e92',
    name: 'M3 E92',
    brand: 'BMW',
    year: 2008,
    valueUsd: 55000,
    image: image('/images/cars/bmw-m3-e92.jpg'),
    description: 'A geração V8 do M3 combina equilíbrio de chassi com um motor aspirado de alta rotação.',
    specs: {
      engine: '4.0L V8 S65 naturally aspirated',
      power: '414 hp',
      torque: '400 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.8s',
      topSpeed: '250 km/h (limited)'
    }
  },
  {
    id: '25',
    slug: 'bmw-m2-cs',
    name: 'M2 CS',
    brand: 'BMW',
    year: 2020,
    valueUsd: 90000,
    image: image('/images/cars/bmw-m2-cs.jpg'),
    description: 'Compacto, agressivo e focado, o M2 CS leva a filosofia M para um pacote menor.',
    specs: {
      engine: '3.0L I6 Twin-Turbo',
      power: '444 hp',
      torque: '550 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.0s',
      topSpeed: '280 km/h'
    }
  },
  {
    id: '26',
    slug: 'bmw-m5-cs',
    name: 'M5 CS',
    brand: 'BMW',
    year: 2022,
    valueUsd: 120000,
    image: image('/images/cars/bmw-m5-cs.jpg'),
    description: 'O sedã mais extremo da linha M5, combinando luxo executivo e performance de pista.',
    specs: {
      engine: '4.4L V8 Twin-Turbo',
      power: '627 hp',
      torque: '750 Nm',
      transmission: '8-speed automatic',
      drivetrain: 'AWD (M xDrive)',
      acceleration: '0-100 km/h em ~3.0s',
      topSpeed: '305 km/h'
    }
  },
  {
    id: '27',
    slug: 'ferrari-f50',
    name: 'F50',
    brand: 'Ferrari',
    year: 1995,
    valueUsd: 4500000,
    image: image('/images/cars/ferrari-f50.jpg'),
    description: 'Supercarro V12 de produção limitada, com engenharia inspirada diretamente na Fórmula 1.',
    specs: {
      engine: '4.7L V12 naturally aspirated',
      power: '513 hp',
      torque: '470 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.7s',
      topSpeed: '325 km/h'
    }
  },
  {
    id: '28',
    slug: 'ferrari-enzo',
    name: 'Enzo',
    brand: 'Ferrari',
    year: 2002,
    valueUsd: 4500000,
    image: image('/images/cars/ferrari-enzo.jpg'),
    description: 'Um dos maiores ícones da Ferrari moderna, com V12 central e foco absoluto em desempenho.',
    specs: {
      engine: '6.0L V12 naturally aspirated',
      power: '651 hp',
      torque: '657 Nm',
      transmission: '6-speed automated manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.6s',
      topSpeed: '350 km/h'
    }
  },
  {
    id: '29',
    slug: 'ferrari-458-italia',
    name: '458 Italia',
    brand: 'Ferrari',
    year: 2009,
    valueUsd: 220000,
    image: image('/images/cars/ferrari-458-italia.jpg'),
    description: 'A última Ferrari V8 central aspirada da era anterior à turboalimentação.',
    specs: {
      engine: '4.5L V8 naturally aspirated',
      power: '562 hp',
      torque: '540 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.4s',
      topSpeed: '340 km/h'
    }
  },
  {
    id: '30',
    slug: 'audi-r8-v10-performance',
    name: 'R8 V10 Performance',
    brand: 'Audi',
    year: 2022,
    valueUsd: 170000,
    image: image('/images/cars/audi-r8-v10.jpg'),
    description: 'Supercarro de motor central com V10 aspirado e linguagem de engenharia próxima do automobilismo.',
    specs: {
      engine: '5.2L V10 naturally aspirated',
      power: '602 hp',
      torque: '560 Nm',
      transmission: '7-speed S tronic dual-clutch',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~3.1s',
      topSpeed: '331 km/h'
    }
  },
  {
    id: '31',
    slug: 'audi-rs3',
    name: 'RS3',
    brand: 'Audi',
    year: 2022,
    valueUsd: 65000,
    image: image('/images/cars/audi-rs3.jpg'),
    description: 'Compacto de alta performance com cinco cilindros e tração quattro.',
    specs: {
      engine: '2.5L I5 Turbo',
      power: '401 hp',
      torque: '500 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'AWD (quattro)',
      acceleration: '0-100 km/h em ~3.8s',
      topSpeed: '250 km/h (limited)'
    }
  },
  {
    id: '32',
    slug: 'mclaren-f1',
    name: 'F1',
    brand: 'McLaren',
    year: 1992,
    valueUsd: 22000000,
    image: image('/images/cars/mclaren-f1.jpg'),
    description: 'Um dos maiores supercarros de todos os tempos, com arquitetura central de três lugares e V12 aspirado.',
    specs: {
      engine: '6.1L V12 naturally aspirated',
      power: '618 hp',
      torque: '650 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.2s',
      topSpeed: '386 km/h'
    }
  },
  {
    id: '33',
    slug: 'mclaren-p1',
    name: 'P1',
    brand: 'McLaren',
    year: 2013,
    valueUsd: 1300000,
    image: image('/images/cars/mclaren-p1.jpg'),
    description: 'Hipercarro híbrido que combina um V8 twin-turbo a um sistema elétrico focado em performance.',
    specs: {
      engine: '3.8L V8 Twin-Turbo + electric motor',
      power: '903 hp',
      torque: '900 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~2.8s',
      topSpeed: '350 km/h'
    }
  },
  {
    id: '34',
    slug: 'toyota-gr-supra-a90',
    name: 'GR Supra A90',
    brand: 'Toyota',
    year: 2019,
    valueUsd: 55000,
    image: image('/images/cars/toyota-gr-supra-a90.jpg'),
    description: 'A nova geração do Supra recuperou o nome com tração traseira e motor de seis cilindros turbo.',
    specs: {
      engine: '3.0L I6 Turbo',
      power: '382 hp',
      torque: '500 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.1s',
      topSpeed: '250 km/h'
    }
  },
  {
    id: '35',
    slug: 'toyota-gr-yaris',
    name: 'GR Yaris',
    brand: 'Toyota',
    year: 2021,
    valueUsd: 45000,
    image: image('/images/cars/toyota-gr-yaris.jpg'),
    description: 'Compacto homologado para rally que combina baixo peso, turbo e tração integral.',
    specs: {
      engine: '1.6L I3 Turbo',
      power: '257 hp',
      torque: '360 Nm',
      transmission: '6-speed manual',
      drivetrain: 'AWD (GR-Four)',
      acceleration: '0-100 km/h em ~5.5s',
      topSpeed: '230 km/h'
    }
  },
  {
    id: '36',
    slug: 'ford-mustang-shelby-gt500',
    name: 'Mustang Shelby GT500',
    brand: 'Ford',
    year: 2020,
    valueUsd: 90000,
    image: image('/images/cars/ford-mustang-shelby-gt500.jpg'),
    description: 'O Mustang de rua mais extremo de sua geração, com V8 supercharged e foco em aceleração.',
    specs: {
      engine: '5.2L V8 Supercharged',
      power: '760 hp',
      torque: '847 Nm',
      transmission: '7-speed dual-clutch',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.5s',
      topSpeed: '290 km/h'
    }
  },
  {
    id: '37',
    slug: 'ford-mustang-boss-302',
    name: 'Mustang Boss 302',
    brand: 'Ford',
    year: 2012,
    valueUsd: 50000,
    image: image('/images/cars/ford-mustang-boss-302.jpg'),
    description: 'Edição de alta performance com foco em resposta de chassi e experiência de condução.',
    specs: {
      engine: '5.0L V8 naturally aspirated',
      power: '444 hp',
      torque: '515 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.5s',
      topSpeed: '250+ km/h'
    }
  },
  {
    id: '38',
    slug: 'lamborghini-miura-p400',
    name: 'Miura P400',
    brand: 'Lamborghini',
    year: 1966,
    valueUsd: 1800000,
    image: image('/images/cars/lamborghini-miura-p400.jpg'),
    description: 'O pioneiro do supercarro de motor central que ajudou a definir a linguagem da Lamborghini.',
    specs: {
      engine: '3.9L V12 naturally aspirated',
      power: '345 hp',
      torque: '355 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~6.7s',
      topSpeed: '280 km/h'
    }
  },
  {
    id: '39',
    slug: 'lamborghini-aventador-svj',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    year: 2018,
    valueUsd: 650000,
    image: image('/images/cars/lamborghini-aventador-svj.jpg'),
    description: 'V12 aspirado, aerodinâmica ativa e um pacote criado para máxima performance.',
    specs: {
      engine: '6.5L V12 naturally aspirated',
      power: '759 hp',
      torque: '720 Nm',
      transmission: '7-speed ISR automated manual',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~2.8s',
      topSpeed: '350 km/h'
    }
  },
  {
    id: '40',
    slug: 'chevrolet-corvette-c7-zr1',
    name: 'Corvette C7 ZR1',
    brand: 'Chevrolet',
    year: 2019,
    valueUsd: 170000,
    image: image('/images/cars/chevrolet-corvette-c7-zr1.jpg'),
    description: 'O auge da geração C7 com V8 supercharged e aerodinâmica agressiva.',
    specs: {
      engine: '6.2L V8 Supercharged',
      power: '755 hp',
      torque: '969 Nm',
      transmission: '7-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.0s',
      topSpeed: '341 km/h'
    }
  },
  {
    id: '41',
    slug: 'chevrolet-camaro-zl1-1le',
    name: 'Camaro ZL1 1LE',
    brand: 'Chevrolet',
    year: 2018,
    valueUsd: 70000,
    image: image('/images/cars/chevrolet-camaro-zl1-1le.jpg'),
    description: 'Muscle car com pacote de pista, suspensão ajustável e foco em comportamento.',
    specs: {
      engine: '6.2L V8 Supercharged',
      power: '650 hp',
      torque: '881 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.5s',
      topSpeed: '318 km/h'
    }
  },
  {
    id: '42',
    slug: 'mazda-rx7-fc',
    name: 'RX-7 FC',
    brand: 'Mazda',
    year: 1989,
    valueUsd: 35000,
    image: image('/images/cars/mazda-rx7-fc.jpg'),
    description: 'A segunda geração do RX-7 refinou a fórmula rotativa com equilíbrio e baixo peso.',
    specs: {
      engine: '1.3L Twin-Rotor 13B Turbo',
      power: '200 hp',
      torque: '265 Nm',
      transmission: '5-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~6.0s',
      topSpeed: '220 km/h'
    }
  },
  {
    id: '43',
    slug: 'mercedes-amg-c63-black-series',
    name: 'C 63 AMG Black Series',
    brand: 'Mercedes-AMG',
    year: 2012,
    valueUsd: 120000,
    image: image('/images/cars/mercedes-amg-c63-black-series.jpg'),
    description: 'Um dos sedãs de performance mais radicais da AMG, marcado pelo V8 aspirado.',
    specs: {
      engine: '6.2L V8 naturally aspirated',
      power: '510 hp',
      torque: '620 Nm',
      transmission: '7-speed AMG SPEEDSHIFT',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.2s',
      topSpeed: '300 km/h'
    }
  },
  {
    id: '44',
    slug: 'mercedes-amg-clk-63-black-series',
    name: 'CLK 63 AMG Black Series',
    brand: 'Mercedes-AMG',
    year: 2007,
    valueUsd: 100000,
    image: image('/images/cars/mercedes-amg-clk-63-black-series.jpg'),
    description: 'Coupe de produção limitada com V8 aspirado e comportamento desenvolvido para entusiastas.',
    specs: {
      engine: '6.2L V8 naturally aspirated',
      power: '507 hp',
      torque: '630 Nm',
      transmission: '7-speed AMG SPEEDSHIFT',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.3s',
      topSpeed: '300 km/h'
    }
  },
  {
    id: '45',
    slug: 'subaru-impreza-wrx-sti',
    name: 'Impreza WRX STI',
    brand: 'Subaru',
    year: 2006,
    valueUsd: 40000,
    image: image('/images/cars/subaru-impreza-wrx-sti.jpg'),
    description: 'Ícone do rally convertido em carro de rua com tração integral e motor boxer turbo.',
    specs: {
      engine: '2.5L Flat-4 Turbo',
      power: '300 hp',
      torque: '407 Nm',
      transmission: '6-speed manual',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~5.0s',
      topSpeed: '250 km/h'
    }
  },
  {
    id: '46',
    slug: 'aston-martin-one-77',
    name: 'One-77',
    brand: 'Aston Martin',
    year: 2009,
    valueUsd: 2000000,
    image: image('/images/cars/aston-martin-one-77.jpg'),
    description: 'Grand Tourer de produção extremamente limitada, combinando V12 aspirado e construção artesanal.',
    specs: {
      engine: '7.3L V12 naturally aspirated',
      power: '750 hp',
      torque: '750 Nm',
      transmission: '6-speed automated manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.7s',
      topSpeed: '354 km/h'
    }
  },
  {
    id: '47',
    slug: 'honda-s2000',
    name: 'S2000',
    brand: 'Honda',
    year: 1999,
    valueUsd: 45000,
    image: image('/images/cars/honda-s2000.jpg'),
    description: 'Roadster de alta rotação celebrado pelo motor VTEC, câmbio manual e equilíbrio de chassi.',
    specs: {
      engine: '2.0L I4 F20C VTEC',
      power: '247 hp',
      torque: '218 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~6.2s',
      topSpeed: '240 km/h'
    }
  },
  {
    id: '48',
    slug: 'koenigsegg-jesko',
    name: 'Jesko',
    brand: 'Koenigsegg',
    year: 2021,
    valueUsd: 3500000,
    image: image('/images/cars/koenigsegg-jesko.jpg'),
    description: 'Hipercarro de engenharia extrema desenvolvido para elevar potência e velocidade a outro patamar.',
    specs: {
      engine: '5.0L V8 Twin-Turbo',
      power: '1281 hp',
      torque: '1000 Nm',
      transmission: '9-speed Light Speed Transmission',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~2.5s (estimated)',
      topSpeed: '480+ km/h (target)'
    }
  },
  {
    id: '49',
    slug: 'koenigsegg-agera-rs',
    name: 'Agera RS',
    brand: 'Koenigsegg',
    year: 2015,
    valueUsd: 4000000,
    image: image('/images/cars/koenigsegg-agera-rs.jpg'),
    description: 'Hipercarro sueco que combinou baixo peso, aerodinâmica e um poderoso V8 biturbo.',
    specs: {
      engine: '5.0L V8 Twin-Turbo',
      power: '1160 hp',
      torque: '1280 Nm',
      transmission: '7-speed automated manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~2.8s',
      topSpeed: '447 km/h'
    }
  },
  {
    id: '50',
    slug: 'pagani-huayra',
    name: 'Huayra',
    brand: 'Pagani',
    year: 2012,
    valueUsd: 2500000,
    image: image('/images/cars/pagani-huayra.jpg'),
    description: 'Obra de arte sobre rodas com V12 biturbo, materiais exóticos e atenção obsessiva aos detalhes.',
    specs: {
      engine: '6.0L V12 Twin-Turbo AMG',
      power: '720 hp',
      torque: '1000 Nm',
      transmission: '7-speed automated manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.3s',
      topSpeed: '383 km/h'
    }
  },
  {
    id: '51',
    slug: 'pagani-zonda-f',
    name: 'Zonda F',
    brand: 'Pagani',
    year: 2005,
    valueUsd: 3500000,
    image: image('/images/cars/pagani-zonda-f.jpg'),
    description: 'Um dos modelos que consolidaram a linguagem artesanal e performática da Pagani.',
    specs: {
      engine: '7.3L V12 naturally aspirated AMG',
      power: '650 hp',
      torque: '780 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.6s',
      topSpeed: '345 km/h'
    }
  },
  {
    id: '52',
    slug: 'rimac-nevera',
    name: 'Nevera',
    brand: 'Rimac',
    year: 2021,
    valueUsd: 2200000,
    image: image('/images/cars/rimac-nevera.jpg'),
    description: 'Hipercarro elétrico de quatro motores, torque instantâneo e desempenho extraordinário.',
    specs: {
      engine: '4 electric motors',
      power: '1888 hp',
      torque: '2360 Nm',
      transmission: 'Single-speed',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~1.97s',
      topSpeed: '412 km/h'
    }
  },
  {
    id: '53',
    slug: 'lotus-emira',
    name: 'Emira',
    brand: 'Lotus',
    year: 2022,
    valueUsd: 90000,
    image: image('/images/cars/lotus-emira.jpg'),
    description: 'Esportivo de motor central que mantém a tradição de leveza, precisão e envolvimento da Lotus.',
    specs: {
      engine: '3.5L V6 Supercharged',
      power: '400 hp',
      torque: '420 Nm',
      transmission: '6-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~4.3s',
      topSpeed: '290 km/h'
    }
  },
  {
    id: '54',
    slug: 'lexus-lfa',
    name: 'LFA',
    brand: 'Lexus',
    year: 2010,
    valueUsd: 1000000,
    image: image('/images/cars/lexus-lfa.jpg'),
    description: 'Supercarro japonês raro, famoso pelo V10 aspirado de alta rotação e sonoridade singular.',
    specs: {
      engine: '4.8L V10 naturally aspirated',
      power: '552 hp',
      torque: '480 Nm',
      transmission: '6-speed automated manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.7s',
      topSpeed: '325 km/h'
    }
  },
  {
    id: '55',
    slug: 'mitsubishi-lancer-evo-vi',
    name: 'Lancer Evolution VI',
    brand: 'Mitsubishi',
    year: 1999,
    valueUsd: 55000,
    image: image('/images/cars/mitsubishi-lancer-evo-vi.jpg'),
    description: 'Ícone de homologação do rally, com motor turbo, tração integral e forte herança competitiva.',
    specs: {
      engine: '2.0L I4 Turbo 4G63T',
      power: '276 hp',
      torque: '373 Nm',
      transmission: '5-speed manual',
      drivetrain: 'AWD',
      acceleration: '0-100 km/h em ~4.8s',
      topSpeed: '180 km/h (JDM limiter)'
    }
  },
  {
    id: '56',
    slug: 'alfa-romeo-giulia-gta',
    name: 'Giulia GTA',
    brand: 'Alfa Romeo',
    year: 2021,
    valueUsd: 250000,
    image: image('/images/cars/alfa-romeo-giulia-gta.jpg'),
    description: 'Versão de alto desempenho do Giulia, com foco em redução de peso e dinâmica de pista.',
    specs: {
      engine: '2.9L V6 Twin-Turbo',
      power: '540 hp',
      torque: '600 Nm',
      transmission: '8-speed automatic',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~3.6s',
      topSpeed: '307 km/h'
    }
  },
  {
    id: '57',
    slug: 'jaguar-e-type-series-1',
    name: 'E-Type Series 1',
    brand: 'Jaguar',
    year: 1961,
    valueUsd: 250000,
    image: image('/images/cars/jaguar-e-type-series-1.jpg'),
    description: 'Um dos grandes ícones do design automotivo, combinando proporções marcantes com desempenho esportivo.',
    specs: {
      engine: '3.8L I6 naturally aspirated',
      power: '265 hp',
      torque: '353 Nm',
      transmission: '4-speed manual',
      drivetrain: 'RWD',
      acceleration: '0-100 km/h em ~6.9s',
      topSpeed: '240 km/h'
    }
  }
]

export const brands: Brand[] = [
  { id: 'b1', slug: 'porsche', name: 'Porsche' },
  { id: 'b2', slug: 'nissan', name: 'Nissan' },
  { id: 'b3', slug: 'bmw', name: 'BMW' },
  { id: 'b4', slug: 'ferrari', name: 'Ferrari' },
  { id: 'b5', slug: 'audi', name: 'Audi' },
  { id: 'b6', slug: 'mclaren', name: 'McLaren' },
  { id: 'b7', slug: 'toyota', name: 'Toyota' },
  { id: 'b8', slug: 'ford', name: 'Ford' },
  { id: 'b9', slug: 'lamborghini', name: 'Lamborghini' },
  { id: 'b10', slug: 'chevrolet', name: 'Chevrolet' },
  { id: 'b11', slug: 'mazda', name: 'Mazda' },
  { id: 'b12', slug: 'mercedes-amg', name: 'Mercedes-AMG' },
  { id: 'b13', slug: 'subaru', name: 'Subaru' },
  { id: 'b14', slug: 'aston-martin', name: 'Aston Martin' },
  { id: 'b15', slug: 'honda', name: 'Honda' },
  { id: 'b16', slug: 'koenigsegg', name: 'Koenigsegg' },
  { id: 'b17', slug: 'pagani', name: 'Pagani' },
  { id: 'b18', slug: 'rimac', name: 'Rimac' },
  { id: 'b19', slug: 'lotus', name: 'Lotus' },
  { id: 'b20', slug: 'lexus', name: 'Lexus' },
  { id: 'b21', slug: 'mitsubishi', name: 'Mitsubishi' },
  { id: 'b22', slug: 'alfa-romeo', name: 'Alfa Romeo' },
  { id: 'b23', slug: 'jaguar', name: 'Jaguar' }
]

export const stories: Story[] = [
  {
    id: 's1',
    slug: 'suspension',
    title: 'Ajuste na suspensão: A Arte do Equilíbrio',
    category: 'TÉCNICO',
    excerpt: 'Uma abordagem editorial sobre como a geometria da suspensão molda a experiência de condução.',
    image: image('../images/stories/Arte_do_Equilíbrio.jpg')
  },
  {
    id: 's2',
    slug: 'twin-turbo-vs-naturally-aspirated',
    title: 'Twin-Turbo vs. Aspirado: A Batalha dos Motores',
    category: 'ANÁLISE',
    excerpt: 'Comparamos a resposta imediata dos motores atmosféricos com a entrega bruta dos turbos modernos.',
    image: image('../images/stories/Twin_Turbo_vs_Naturally_Aspirated.jpg')
  },
  {
    id: 's3',
    slug: 'golden-era-jdm',
    title: 'A Era Ouro dos Esportivos Japoneses nos Anos 90',
    category: 'HISTÓRIA',
    excerpt: 'Como o "Acordo dos Cavaleiros" produziu alguns dos veículos mais icônicos da cultura automotiva mundial.',
    image: image('../images/stories/Golden_Era_JDM.jpg')
  },
  {
    id: 's4',
    slug: 'senna-and-nsx-legacy',
    title: 'Como Ayrton Senna Moldou o Honda NSX',
    category: 'CULTURA',
    excerpt: 'A história do teste em Suzuka que fez a Honda recalibrar toda a rigidez do chassi do primeiro NSX.',
    image: image('../images/stories/Senna_and_NSX_Legacy.jpg')
  },
  {
    id: 's5',
    slug: 'wankel-rotary-engine-explained',
    title: 'O Encanto e os Desafios do Motor Rotativo Wankel',
    category: 'TÉCNICO',
    excerpt: 'Entenda o funcionamento interno, as vantagens de peso e por que os motores sem pistões convencionais geram tanta paixão.',
    image: image('../images/stories/Wankel_Rotary_Engine_Explained.jpg')
  }
]

export const collections: Collection[] = [
  { 
    id: 'c1', 
    slug: 'jdm-legends', 
    title: 'JDM Legends', 
    description: 'Uma curadoria de ícones japoneses de performance.' 
  },
  { 
    id: 'c2', 
    slug: 'analog-supercars', 
    title: 'Analógicos de Ouro', 
    description: 'Supercarros focados no envolvimento do motorista, câmbio manual e pouca eletrônica.' 
  },
  { 
    id: 'c3', 
    slug: 'track-weapons', 
    title: 'Devoradores de Pista', 
    description: 'Veículos homologados para as ruas, mas projetados com foco total em tempos de volta.' 
  },
  { 
    id: 'c4', 
    slug: 'rally-homologation', 
    title: 'Lendas do Rally', 
    description: 'Modelos criados com especificações de rua apenas para homologar carros de competição no WRC.' 
  },
  { 
    id: 'c5', 
    slug: 'v12-symphony', 
    title: 'Sinfonia V12', 
    description: 'Máquinas impulsionadas por uma das configurações de motor mais nobres e sonoras da história.' 
  }
]