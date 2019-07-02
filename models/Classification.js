const db = require('mongoose');

const ClassificationSchema = new db.Schema({
  user: {
    type: String
    //required: true
  },
  picture_path: {
    type: String
    //required: true
  }, // should be passed when the classification analysis is inserted
  date: {
    type: Date,
    default: Date.now
  },
  submitFlag: {
    type: Number
    // if submitted should be one, if 'not LPD/GPD' then 0, if pass, should be NaN (Null), if
  },
  channel_test: {
    type: Boolean
  },
  // channel_1: [
  //   {
  //     name: {
  //       type: {
  //         String,
  //         default: 'Fp1-F7'
  //       }
  //     },
  //     group: {
  //       type: {
  //         String,
  //         default: 'Group 1'
  //       }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_2: [
  //   {
  //     name: {
  //       type: { String, default: 'F7-T3' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 1' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_3: [
  //   {
  //     name: {
  //       type: { String, default: 'T3-T5' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 1' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_4: [
  //   {
  //     name: {
  //       type: { String, default: 'T5-01' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 1' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_5: [
  //   {
  //     name: {
  //       type: { String, default: 'Fp2-F8' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 2' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_6: [
  //   {
  //     name: {
  //       type: { String, default: 'F8-T4' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 2' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_7: [
  //   {
  //     name: {
  //       type: { String, default: 'T4-T6' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 2' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_8: [
  //   {
  //     name: {
  //       type: { String, default: 'T6-O2' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 2' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_9: [
  //   {
  //     name: {
  //       type: { String, default: 'Fp1-F3' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 3' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_10: [
  //   {
  //     name: {
  //       type: { String, default: 'F3-C3' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 3' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_11: [
  //   {
  //     name: {
  //       type: { String, default: 'C3-P3' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 3' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_12: [
  //   {
  //     name: {
  //       type: { String, default: 'P3-O1' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 3' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_13: [
  //   {
  //     name: {
  //       type: { String, default: 'Fp2-F4' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 4' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_14: [
  //   {
  //     name: {
  //       type: { String, default: 'F4-C4' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 4' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_15: [
  //   {
  //     name: {
  //       type: { String, default: 'C4-P4' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 4' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_16: [
  //   {
  //     name: {
  //       type: { String, default: 'P4-O2' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 4' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_17: [
  //   {
  //     name: {
  //       type: { String, default: 'Fz-Cz' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 5' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  // channel_18: [
  //   {
  //     name: {
  //       type: { String, default: 'Cz-Pz' }
  //     },
  //     group: {
  //       type: { String, default: 'Group 5' }
  //     },
  //     selected: {
  //       type: Boolean
  //     }
  //   }
  // ],
  classificationChoice: [
    {
      classifier: String,
      classType: String,
      predominance: [String]
    }
  ],
  opt_classificationChoice: [
    {
      classifier: String,
      classType: String,
      predominance: [String]
    }
  ],
  montage: {
    type: String
  },
  frequency: {
    type: String
  },
  channelsSelected: {
    type: [String]
  }
});

module.exports = Classification = db.model(
  'classification',
  ClassificationSchema
);
