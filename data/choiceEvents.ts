import { ChoiceEvent } from '../types/choiceEvents';

export const CHOICE_EVENTS: ChoiceEvent[] = [
  // === PRIMARY SCHOOL EVENTS ===
  {
    id: 'eraser_fight',
    title: 'The Great Eraser Fight',
    description: 'During recess, someone starts an eraser fight. Erasers are flying everywhere! The discipline master is coming!',
    emoji: '✏️',
    category: 'ridiculous',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'join',
        text: 'Join the fight!',
        emoji: '🥊',
        statChanges: { happiness: 15, stress: -10, reputation: -10, health: -5 },
        description: 'So fun! But you get caught and have to stay back after school.'
      },
      {
        id: 'hide',
        text: 'Hide under the desk',
        emoji: '🙈',
        statChanges: { happiness: -5, stress: 5, reputation: -5 },
        description: 'You survive but everyone thinks you\'re a scaredy-cat.'
      },
      {
        id: 'warn',
        text: 'Warn everyone the teacher is coming',
        emoji: '🚨',
        statChanges: { happiness: 10, reputation: 20, socialImpact: 10, leadership: 5 },
        description: 'You\'re a hero! Everyone thanks you. You saved the day!'
      },
      {
        id: 'report',
        text: 'Report to the teacher',
        emoji: '👎',
        statChanges: { happiness: -20, reputation: -30, socialImpact: -15 },
        description: 'You\'re now known as the class snitch. Nobody talks to you.'
      }
    ]
  },
  {
    id: 'canteen_food',
    title: 'Canteen Food Mystery',
    description: 'The canteen auntie gives you extra chicken nuggets for free! But your friend didn\'t get any.',
    emoji: '🍗',
    category: 'funny',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'share',
        text: 'Share with your friend',
        emoji: '❤️',
        statChanges: { happiness: 10, socialImpact: 15, reputation: 10 },
        description: 'Your friend is so happy! The auntie smiles and gives you MORE next time.'
      },
      {
        id: 'eat_all',
        text: 'Eat them all yourself',
        emoji: '😋',
        statChanges: { happiness: 5, health: -5, reputation: -10 },
        description: 'Delicious! But your friend is sad. You feel a bit guilty.'
      },
      {
        id: 'thank_auntie',
        text: 'Thank the auntie loudly',
        emoji: '🙏',
        statChanges: { happiness: 15, reputation: 15, socialImpact: 10 },
        description: 'The auntie is touched! She becomes your favorite person. Free food forever!'
      },
      {
        id: 'suspicious',
        text: 'Get suspicious and don\'t eat them',
        emoji: '🤔',
        statChanges: { happiness: -10, stress: 10 },
        description: 'You throw them away. They were perfectly fine. You\'re hungry now.'
      }
    ]
  },
  {
    id: 'pokemon_cards',
    title: 'Pokemon Card Trade',
    description: 'A classmate wants to trade their holographic Charizard for your entire collection. It\'s worth way more!',
    emoji: '🎴',
    category: 'difficult',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'accept',
        text: 'Accept the trade immediately!',
        emoji: '✨',
        statChanges: { happiness: 25, reputation: 15, wealth: 50 },
        description: 'BEST TRADE EVER! You\'re the Pokemon master now! Everyone is jealous!'
      },
      {
        id: 'reject',
        text: 'Reject - something feels wrong',
        emoji: '❌',
        statChanges: { happiness: -5, stress: 5 },
        description: 'Good instinct! The card was fake. You kept your collection safe.'
      },
      {
        id: 'negotiate',
        text: 'Ask for Charizard + 5 more cards',
        emoji: '🤝',
        statChanges: { happiness: 30, reputation: 20, wealth: 100, leadership: 10 },
        description: 'They agree! You\'re a negotiation genius! Best deal ever!'
      },
      {
        id: 'tell_teacher',
        text: 'Tell teacher (cards banned in school)',
        emoji: '👎',
        statChanges: { happiness: -15, reputation: -25, socialImpact: -20 },
        description: 'Everyone\'s cards get confiscated. You\'re the most hated kid now.'
      }
    ]
  },
  {
    id: 'class_monitor',
    title: 'Class Monitor Election',
    description: 'It\'s time to elect a class monitor. Your best friend is running. But you also want to run!',
    emoji: '🗳️',
    category: 'difficult',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'run',
        text: 'Run against your friend',
        emoji: '🏆',
        statChanges: { happiness: 10, reputation: 15, leadership: 20, socialImpact: -10 },
        description: 'You win! But your friendship is strained. Leadership comes with sacrifice.'
      },
      {
        id: 'support',
        text: 'Support your friend instead',
        emoji: '❤️',
        statChanges: { happiness: 15, socialImpact: 20, reputation: 10 },
        description: 'Your friend wins and is so grateful! True friendship wins!'
      },
      {
        id: 'team_up',
        text: 'Propose running together as co-monitors',
        emoji: '🤝',
        statChanges: { happiness: 20, reputation: 25, leadership: 15, socialImpact: 15 },
        description: 'Brilliant idea! Teacher loves it! You both win! Power duo!'
      },
      {
        id: 'avoid',
        text: 'Avoid the whole thing',
        emoji: '😐',
        statChanges: { happiness: -5, leadership: -10 },
        description: 'You stay neutral but miss out on a leadership opportunity.'
      }
    ]
  },
  {
    id: 'homework_forgot',
    title: 'Forgot Homework Crisis',
    description: 'You forgot to do your homework! Teacher is collecting now! Your friend offers to let you copy.',
    emoji: '📓',
    category: 'difficult',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'copy',
        text: 'Quickly copy your friend\'s work',
        emoji: '✍️',
        statChanges: { happiness: 5, stress: -10, academicSkill: -5, reputation: -5 },
        description: 'You survive! But you didn\'t learn anything. And you feel guilty.'
      },
      {
        id: 'confess',
        text: 'Confess to the teacher',
        emoji: '🙇',
        statChanges: { happiness: -10, stress: 15, reputation: 10, leadership: 5 },
        description: 'Teacher appreciates your honesty! You get extra time. Integrity wins!'
      },
      {
        id: 'fake_sick',
        text: 'Pretend to be sick',
        emoji: '🤒',
        statChanges: { happiness: -5, stress: 20, health: -5 },
        description: 'Teacher sends you to sick bay. Now you have to fake being sick all day.'
      },
      {
        id: 'do_now',
        text: 'Try to do it super fast now',
        emoji: '⚡',
        statChanges: { happiness: 10, stress: 25, academicSkill: 10, leadership: 10 },
        description: 'You finish in 5 minutes! Messy but done! Teacher is impressed by your speed!'
      }
    ]
  },
  {
    id: 'playground_bully',
    title: 'Playground Bully',
    description: 'A bigger kid is bullying a younger student at the playground. Your friends are watching.',
    emoji: '😡',
    category: 'dramatic',
    minAge: 7,
    maxAge: 12,
    options: [
      {
        id: 'confront',
        text: 'Stand up to the bully',
        emoji: '🦸',
        statChanges: { happiness: 15, reputation: 25, socialImpact: 30, leadership: 15, health: -10 },
        description: 'You\'re a hero! The younger kid is saved! Everyone respects you now!'
      },
      {
        id: 'get_teacher',
        text: 'Run and get a teacher',
        emoji: '🏃',
        statChanges: { happiness: 10, socialImpact: 20, reputation: 15 },
        description: 'Smart move! Teacher stops the bully. You did the right thing!'
      },
      {
        id: 'distract',
        text: 'Distract the bully with a joke',
        emoji: '🤡',
        statChanges: { happiness: 20, socialImpact: 25, reputation: 20, leadership: 10 },
        description: 'Your joke makes everyone laugh! Bully forgets about fighting. Crisis averted!'
      },
      {
        id: 'walk_away',
        text: 'Walk away and ignore it',
        emoji: '🚶',
        statChanges: { happiness: -15, reputation: -20, socialImpact: -25, stress: 15 },
        description: 'You feel terrible. The younger kid gets hurt. You can\'t sleep that night.'
      }
    ]
  },

  // === RIDICULOUS EVENTS ===
  {
    id: 'durian_challenge',
    title: 'The Great Durian Challenge',
    description: 'A street vendor challenges you to eat an entire durian in 5 minutes for $500. A crowd gathers. What do you do?',
    emoji: '🤢',
    category: 'ridiculous',
    options: [
      {
        id: 'accept',
        text: 'Accept and devour it!',
        emoji: '💪',
        statChanges: { wealth: 500, health: -15, happiness: 10, reputation: 15 },
        description: 'You did it! But you smell like durian for a week.'
      },
      {
        id: 'negotiate',
        text: 'Negotiate for $1000',
        emoji: '🤝',
        statChanges: { wealth: -50, happiness: -5, stress: 5 },
        description: 'The vendor laughs and the crowd boos. You leave embarrassed.'
      },
      {
        id: 'counter_challenge',
        text: 'Challenge HIM to eat TWO durians',
        emoji: '😈',
        statChanges: { wealth: 1000, happiness: 20, reputation: 20, socialImpact: 10 },
        description: 'He accepts! You both eat. You win! The crowd goes wild!'
      },
      {
        id: 'run_away',
        text: 'Run away screaming',
        emoji: '🏃',
        statChanges: { happiness: -10, reputation: -20, stress: -5 },
        description: 'You can never show your face in that neighborhood again.'
      }
    ]
  },

  {
    id: 'mrt_breakdown',
    title: 'MRT Breakdown Chaos',
    description: 'The MRT breaks down during rush hour. You\'re stuck between stations for 2 hours. A fellow passenger starts singing karaoke.',
    emoji: '🚇',
    category: 'ridiculous',
    options: [
      {
        id: 'join_singing',
        text: 'Join the karaoke party!',
        emoji: '🎤',
        statChanges: { happiness: 15, socialImpact: 10, stress: -10, reputation: -5 },
        description: 'You become MRT legends! A video goes viral.'
      },
      {
        id: 'complain_loudly',
        text: 'Complain loudly to SMRT staff',
        emoji: '😤',
        statChanges: { stress: 10, happiness: -10, reputation: -10 },
        description: 'Everyone glares at you. The singing gets louder.'
      },
      {
        id: 'start_business',
        text: 'Start selling snacks to passengers',
        emoji: '💼',
        statChanges: { wealth: 200, happiness: 10, workExperience: 5, reputation: 10 },
        description: 'Entrepreneurial genius! You make $200 in 2 hours.'
      },
      {
        id: 'meditate',
        text: 'Meditate and achieve enlightenment',
        emoji: '🧘',
        statChanges: { stress: -20, happiness: 15, health: 5 },
        description: 'You find inner peace. The chaos doesn\'t bother you anymore.'
      }
    ]
  },

  {
    id: 'hawker_center_fight',
    title: 'Hawker Center Seat War',
    description: 'You and an auntie both spot the last empty table at a crowded hawker center. She\'s already moving towards it with her tissue packet.',
    emoji: '🍜',
    category: 'ridiculous',
    options: [
      {
        id: 'sprint',
        text: 'SPRINT to the table!',
        emoji: '🏃‍♂️',
        statChanges: { happiness: 10, reputation: -15, stress: 5, health: 5 },
        description: 'You win! But she gives you the death stare the entire meal.'
      },
      {
        id: 'negotiate_share',
        text: 'Offer to share the table',
        emoji: '🤝',
        statChanges: { happiness: 5, socialImpact: 15, reputation: 10 },
        description: 'She shares her secret chili recipe! You made a new friend.'
      },
      {
        id: 'bribe',
        text: 'Bribe her with kopi',
        emoji: '☕',
        statChanges: { wealth: -5, happiness: 10, reputation: 5 },
        description: 'She accepts! You get the table and she blesses your meal.'
      },
      {
        id: 'give_up',
        text: 'Give up and eat standing',
        emoji: '🧍',
        statChanges: { happiness: -10, health: -5, stress: 10 },
        description: 'Your back hurts. Your food gets cold. Sad meal.'
      }
    ]
  },

  {
    id: 'ns_ghost',
    title: 'Tekong Ghost Encounter',
    description: 'During guard duty at 3am, you see a figure in white floating near the old building. Your buddy is asleep.',
    emoji: '👻',
    category: 'ridiculous',
    minAge: 18,
    maxAge: 21,
    options: [
      {
        id: 'investigate',
        text: 'Investigate with your rifle',
        emoji: '🔫',
        statChanges: { stress: 20, happiness: -15, health: -10, leadership: 10 },
        description: 'It was a plastic bag. But you\'re a hero for checking.'
      },
      {
        id: 'pray',
        text: 'Recite every prayer you know',
        emoji: '🙏',
        statChanges: { stress: -10, happiness: 5 },
        description: 'The "ghost" leaves. Your faith is strengthened.'
      },
      {
        id: 'wake_everyone',
        text: 'Wake up the entire platoon',
        emoji: '📢',
        statChanges: { stress: -5, happiness: -20, reputation: -25 },
        description: 'Everyone is angry. You get extra duties for a week.'
      },
      {
        id: 'befriend',
        text: 'Try to befriend the ghost',
        emoji: '👋',
        statChanges: { happiness: 10, stress: -15, socialImpact: 5, reputation: 30 },
        description: 'It was a cat. You adopt it as the platoon mascot. Legend.'
      }
    ]
  },

  // === DIFFICULT LIFE DECISIONS ===
  {
    id: 'job_vs_passion',
    title: 'Career Crossroads',
    description: 'You have two job offers: A high-paying corporate job ($120k) or your dream startup ($40k) with equity.',
    emoji: '💼',
    category: 'difficult',
    minAge: 22,
    options: [
      {
        id: 'corporate',
        text: 'Take the corporate job',
        emoji: '🏢',
        statChanges: { wealth: 80000, happiness: -10, stress: 15, workExperience: 10 },
        description: 'Financial security, but your soul dies a little each day.'
      },
      {
        id: 'startup',
        text: 'Join the startup',
        emoji: '🚀',
        statChanges: { wealth: -20000, happiness: 20, stress: 20, workExperience: 25 },
        description: 'Exciting but stressful! You learn so much. Equity might pay off...'
      },
      {
        id: 'negotiate',
        text: 'Negotiate with both for better terms',
        emoji: '🤝',
        statChanges: { wealth: 50000, happiness: 10, stress: 10, leadership: 15 },
        description: 'You get the startup to match salary! Best of both worlds.'
      },
      {
        id: 'reject_both',
        text: 'Reject both and travel the world',
        emoji: '✈️',
        statChanges: { wealth: -30000, happiness: 30, stress: -20, health: 10, socialImpact: 15 },
        description: 'YOLO! You find yourself in Bali. Career can wait.'
      }
    ]
  },

  {
    id: 'relationship_crisis',
    title: 'Love vs Career',
    description: 'Your partner got a dream job overseas. They want you to come. But you just got promoted.',
    emoji: '💔',
    category: 'difficult',
    minAge: 25,
    options: [
      {
        id: 'follow',
        text: 'Follow your partner',
        emoji: '❤️',
        statChanges: { happiness: 15, wealth: -50000, workExperience: -10, stress: 15 },
        description: 'Love wins! But starting over is hard. You hope it\'s worth it.'
      },
      {
        id: 'stay',
        text: 'Stay for your career',
        emoji: '💼',
        statChanges: { happiness: -20, wealth: 50000, stress: 20, workExperience: 15 },
        description: 'Career first. The relationship ends. You wonder "what if?"'
      },
      {
        id: 'long_distance',
        text: 'Try long distance',
        emoji: '📱',
        statChanges: { happiness: -5, wealth: -20000, stress: 25, health: -10 },
        description: 'Flight tickets are expensive. You\'re always tired. It\'s tough.'
      },
      {
        id: 'compromise',
        text: 'Propose a 2-year plan',
        emoji: '📋',
        statChanges: { happiness: 10, stress: 10, leadership: 10 },
        description: 'You both agree to reassess in 2 years. Mature decision!'
      }
    ]
  },

  {
    id: 'parent_illness',
    title: 'Family Emergency',
    description: 'Your parent is seriously ill and needs someone to care for them full-time. You have a demanding job.',
    emoji: '🏥',
    category: 'difficult',
    minAge: 30,
    options: [
      {
        id: 'quit_job',
        text: 'Quit your job to care for them',
        emoji: '❤️',
        statChanges: { wealth: -100000, happiness: 10, stress: 20, workExperience: -15, socialImpact: 20 },
        description: 'Family first. Money can be earned again. Time cannot.'
      },
      {
        id: 'hire_help',
        text: 'Hire a caregiver',
        emoji: '👨‍⚕️',
        statChanges: { wealth: -50000, happiness: -5, stress: 15 },
        description: 'Professional care, but you feel guilty for not being there.'
      },
      {
        id: 'work_remote',
        text: 'Negotiate remote work',
        emoji: '💻',
        statChanges: { happiness: 5, stress: 25, workExperience: 5, leadership: 10 },
        description: 'Juggling work and care is exhausting but you manage.'
      },
      {
        id: 'siblings_help',
        text: 'Rally siblings to share responsibility',
        emoji: '👨‍👩‍👧‍👦',
        statChanges: { happiness: 10, stress: 10, socialImpact: 15 },
        description: 'Teamwork! Your family bonds grow stronger through hardship.'
      }
    ]
  },

  // === FUNNY EVENTS ===
  {
    id: 'zoom_embarrassment',
    title: 'Zoom Call Disaster',
    description: 'You\'re in an important work meeting. Your camera is on. Your cat jumps on your head. Your boss is watching.',
    emoji: '🐱',
    category: 'funny',
    options: [
      {
        id: 'play_cool',
        text: 'Pretend it\'s normal',
        emoji: '😎',
        statChanges: { happiness: 10, reputation: 15, stress: -5 },
        description: 'Everyone laughs. Your cat becomes the office mascot.'
      },
      {
        id: 'panic',
        text: 'Panic and disconnect',
        emoji: '😱',
        statChanges: { happiness: -10, stress: 20, reputation: -10 },
        description: 'You "accidentally" lose connection. Everyone knows.'
      },
      {
        id: 'embrace',
        text: 'Introduce your cat formally',
        emoji: '🎤',
        statChanges: { happiness: 15, socialImpact: 10, reputation: 20 },
        description: '"This is Mr. Whiskers, my assistant." Boss loves it!'
      },
      {
        id: 'blame_cat',
        text: 'Blame the cat for everything',
        emoji: '🙀',
        statChanges: { happiness: 5, stress: 5 },
        description: '"Sorry, my cat ate my report." Nobody believes you.'
      }
    ]
  },

  {
    id: 'wedding_speech',
    title: 'Best Man Speech Gone Wrong',
    description: 'You\'re giving the best man speech. You accidentally mention the groom\'s ex-girlfriend. Twice.',
    emoji: '🎤',
    category: 'funny',
    minAge: 25,
    options: [
      {
        id: 'double_down',
        text: 'Make it a running joke',
        emoji: '😂',
        statChanges: { happiness: 10, reputation: -15, socialImpact: 10 },
        description: 'The crowd laughs. The groom doesn\'t. You\'re not invited to the next wedding.'
      },
      {
        id: 'apologize',
        text: 'Apologize profusely',
        emoji: '🙏',
        statChanges: { happiness: -5, stress: 15, reputation: 5 },
        description: 'Awkward but sincere. The bride forgives you. Eventually.'
      },
      {
        id: 'change_subject',
        text: 'Quickly pivot to embarrassing childhood stories',
        emoji: '📖',
        statChanges: { happiness: 15, socialImpact: 15, reputation: 10 },
        description: 'Everyone forgets about the ex! Your stories are hilarious.'
      },
      {
        id: 'fake_faint',
        text: 'Fake a medical emergency',
        emoji: '🤒',
        statChanges: { happiness: -10, reputation: -20, stress: -10 },
        description: 'You escape! But everyone thinks you\'re weird now.'
      }
    ]
  },

  {
    id: 'gym_incident',
    title: 'Gym Equipment Malfunction',
    description: 'You\'re at the gym trying to impress someone. The treadmill speed suddenly maxes out. You can\'t find the stop button.',
    emoji: '🏃‍♂️',
    category: 'funny',
    options: [
      {
        id: 'keep_running',
        text: 'Keep running like a champion!',
        emoji: '💪',
        statChanges: { health: 10, happiness: 15, reputation: 20, stress: 15 },
        description: 'You\'re a legend! Everyone cheers. You get their number.'
      },
      {
        id: 'jump_off',
        text: 'Jump off dramatically',
        emoji: '🤸',
        statChanges: { health: -15, happiness: -10, reputation: -15 },
        description: 'You land badly. Very badly. The gym bans you.'
      },
      {
        id: 'call_help',
        text: 'Scream for help',
        emoji: '😱',
        statChanges: { happiness: -5, reputation: -10, stress: 20 },
        description: 'Staff comes running. Everyone records you. You\'re a meme.'
      },
      {
        id: 'embrace_chaos',
        text: 'Start doing tricks',
        emoji: '🎪',
        statChanges: { happiness: 20, health: 15, socialImpact: 15, reputation: 25 },
        description: 'You go viral! "Treadmill Ninja" becomes your nickname.'
      }
    ]
  },

  // === DRAMATIC EVENTS ===
  {
    id: 'whistleblower',
    title: 'Corporate Corruption',
    description: 'You discovered your company is doing something illegal. You have evidence. Your boss knows you know.',
    emoji: '📄',
    category: 'dramatic',
    minAge: 25,
    options: [
      {
        id: 'report',
        text: 'Report to authorities',
        emoji: '⚖️',
        statChanges: { wealth: -80000, happiness: 10, stress: 30, socialImpact: 50, reputation: 30 },
        description: 'You\'re fired but you did the right thing. You\'re a hero.'
      },
      {
        id: 'blackmail',
        text: 'Use it for promotion',
        emoji: '😈',
        statChanges: { wealth: 100000, happiness: -20, stress: 40, reputation: -30 },
        description: 'You get promoted but can\'t sleep at night. Guilt eats you.'
      },
      {
        id: 'quit_quietly',
        text: 'Quit and stay silent',
        emoji: '🤐',
        statChanges: { wealth: -30000, happiness: -10, stress: 20 },
        description: 'You leave with your conscience intact. But you wonder...'
      },
      {
        id: 'anonymous_leak',
        text: 'Leak anonymously to media',
        emoji: '📰',
        statChanges: { happiness: 15, stress: 35, socialImpact: 40, reputation: 20 },
        description: 'The story breaks! Company collapses. You keep your job elsewhere.'
      }
    ]
  },

  {
    id: 'inheritance_dilemma',
    title: 'The Inheritance',
    description: 'A distant relative left you $500k but only if you quit your job and move to their old house in a kampong for 1 year.',
    emoji: '🏠',
    category: 'dramatic',
    minAge: 28,
    options: [
      {
        id: 'accept',
        text: 'Accept the challenge',
        emoji: '✅',
        statChanges: { wealth: 500000, happiness: 10, stress: -20, workExperience: -20, health: 15 },
        description: 'Simple life is good! You discover what matters. Rich and wise.'
      },
      {
        id: 'reject',
        text: 'Reject and continue career',
        emoji: '❌',
        statChanges: { happiness: -5, workExperience: 15, stress: 10 },
        description: 'Career is more important. You wonder if you made a mistake.'
      },
      {
        id: 'negotiate',
        text: 'Negotiate to work remotely from kampong',
        emoji: '💻',
        statChanges: { wealth: 250000, happiness: 15, stress: 15, workExperience: 10 },
        description: 'Compromise! You get half the money and keep your job.'
      },
      {
        id: 'rent_out',
        text: 'Accept but rent out the house',
        emoji: '🏘️',
        statChanges: { wealth: 600000, happiness: 5, stress: 25, reputation: -15 },
        description: 'Loophole! But the lawyer finds out. Legal battle ensues.'
      }
    ]
  }
];

/**
 * Get a random choice event appropriate for the player's age
 */
export function getRandomChoiceEvent(age: number): ChoiceEvent {
  const availableEvents = CHOICE_EVENTS.filter(event => {
    if (event.minAge && age < event.minAge) return false;
    if (event.maxAge && age > event.maxAge) return false;
    return true;
  });

  if (availableEvents.length === 0) {
    // Fallback to any event if no age-appropriate ones
    return CHOICE_EVENTS[Math.floor(Math.random() * CHOICE_EVENTS.length)];
  }

  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}
