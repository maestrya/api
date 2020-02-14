const PagesData = {
  "header": {
    "title": {
      "accessibility": "value",
      "text": "value"
    }
  },
  "body": {
    "type": "static",
    "render": [
      {
        "type": "text",
        "accessibility": "value",
        "value": {
          "header": "Lorem Ipsum",
          "text": "Lorem Ipsum"
        }
      },
      {
        "type": "input",
        "value": {
          "name": "page_test_input_cpf",
          "value": "value_cpf",
          "mask": "cpf",
          "type": "text",
          "validation": [
            "required"
          ],
          "events": {
            "change": "page_test.page_test_input_cpf.change"
          }
        }
      },
      {
        "type": "input",
        "value": {
          "name": "page_test_input_pass",
          "value": "value_password",
          "mask": null,
          "type": "password",
          "validation": [
            "required"
          ],
          "events": {
            "change": "page_test.page_test_input_pass.change"
          }
        }
      },
      {
        "type": "cards",
        "value": {
          "style": {
            "groupHeight": 200.0,
            "cardwidth": 200.0
          },
          "type": "horizontal",
          "cards": [
            {
              "text": "Lorem Ipsum",
              "link": "LoremIpsum"
            },
            {
              "text": "Ipsum Lorem",
              "link": "LoremIpsum"
            }
          ]
        }
      },
      {
        "type": "select",
        "value": {
          "name": "page_test_input_select",
          "value": 3,
          "mask": null,
          "type": "select",
          "validation": [
            "required"
          ],
          "events": {
            "change": "page_test.page_test_input_select.change"
          },
          "options": [
            {
              "id": 1,
              "text": "Lorem Ipsum"
            },
            {
              "id": 2,
              "text": "Ipsum lorem"
            },
            {
              "id": 3,
              "text": "Birl"
            }
          ]
        }
      }
    ]
  },
  "footer": {
    "buttons": {
      "type": "side",
      "render": [
        {
          "name": "page_test_submit",
          "accessibility": "Continuar",
          "color": "blue",
          "body": {
            "cpf": null,
            "password": null
          },
          "disabled": true,
          "text": "Continuar",
          "events": {
            "click": "page_test.page_test_submit.click"
          }
        }
      ]
    }
  }
};

module.exports = { PagesData };
