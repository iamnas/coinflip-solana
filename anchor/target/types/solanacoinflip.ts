/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solanacoinflip.json`.
 */
export type Solanacoinflip = {
  "address": "AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ",
  "metadata": {
    "name": "solanacoinflip",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "coinFlip",
      "discriminator": [
        229,
        124,
        31,
        2,
        166,
        139,
        34,
        248
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "gameIds",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "flipResult",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  105,
                  112,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "game_ids.id"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "gameIds",
          "type": "u128"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "flip",
      "discriminator": [
        13,
        33,
        94,
        130,
        154,
        238,
        111,
        35
      ]
    },
    {
      "name": "gameIds",
      "discriminator": [
        11,
        155,
        145,
        132,
        159,
        125,
        93,
        22
      ]
    }
  ],
  "types": [
    {
      "name": "flip",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "result",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gameIds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u128"
          }
        ]
      }
    }
  ]
};
