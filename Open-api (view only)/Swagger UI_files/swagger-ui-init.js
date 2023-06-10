
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth": {
        "get": {
          "operationId": "AppController_getHelloAuth",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/authentication/register": {
        "post": {
          "operationId": "AuthenticationController_RegisterUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The record has been successfully created."
            },
            "400": {
              "description": "Validation Failed"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/authentication/is-user-exist/{username}": {
        "get": {
          "operationId": "AuthenticationController_IsUserExistByUsername",
          "parameters": [
            {
              "name": "username",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User is exist"
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/authentication/login": {
        "post": {
          "operationId": "AuthenticationController_Login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login Success"
            },
            "400": {
              "description": "Login Failed"
            },
            "404": {
              "description": "Username Not Found"
            }
          },
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/user-management/profile": {
        "get": {
          "operationId": "UserManagementController_getProfile",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Profile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProfileModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "User Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/user-management/address": {
        "post": {
          "operationId": "UserManagementController_createUserAddress",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAddressDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Address",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AddressModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "User Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "UserManagementController_getUserAddress",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Address",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AddressModel"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "User Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product-management/products": {
        "get": {
          "operationId": "ProductManagementController_getProducts",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Product",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ProductModel"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Product Management"
          ]
        }
      },
      "/product-management/product/{productId}": {
        "get": {
          "operationId": "ProductManagementController_getProductByProductId",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Product Not Found"
            }
          },
          "tags": [
            "Product Management"
          ]
        }
      },
      "/order-management/order": {
        "post": {
          "operationId": "OrderManagementController_createOrder",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserCreateOrderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Order",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OrderModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Order Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order-management/cancel/{orderId}": {
        "get": {
          "operationId": "OrderManagementController_cancelOrder",
          "parameters": [
            {
              "name": "orderId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Order",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OrderModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Order Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order-management/detial/{orderId}": {
        "get": {
          "operationId": "OrderManagementController_getOrderDetial",
          "parameters": [
            {
              "name": "orderId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Order",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OrderModel"
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Order Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order-management/history": {
        "get": {
          "operationId": "OrderManagementController_getUserHistory",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Order",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/OrderModel"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation Failed"
            },
            "401": {
              "description": "Authorization Required"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Order Management"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Never Service OpenAPI",
      "description": "Never Service API description",
      "version": "3.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Authentication",
        "description": ""
      },
      {
        "name": "User Management",
        "description": ""
      },
      {
        "name": "Order Management",
        "description": ""
      },
      {
        "name": "Product Management",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "RegisterUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password"
          ]
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password"
          ]
        },
        "ProfileModel": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "default": "name"
            },
            "image": {
              "type": "string",
              "default": ""
            },
            "bio": {
              "type": "string",
              "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          },
          "required": [
            "name",
            "image",
            "bio"
          ]
        },
        "CreateAddressDto": {
          "type": "object",
          "properties": {
            "receiver": {
              "type": "string"
            },
            "building_number": {
              "type": "string"
            },
            "street": {
              "type": "string"
            },
            "subdistrict": {
              "type": "string"
            },
            "district": {
              "type": "string"
            },
            "province": {
              "type": "string"
            },
            "postal_code": {
              "type": "string"
            }
          },
          "required": [
            "receiver",
            "building_number",
            "street",
            "subdistrict",
            "district",
            "province",
            "postal_code"
          ]
        },
        "AddressModel": {
          "type": "object",
          "properties": {
            "address_id": {
              "type": "string",
              "default": "00000000-0000-0000-0000-000000000000"
            },
            "receiver": {
              "type": "string",
              "default": "receiver name"
            },
            "building_number": {
              "type": "string",
              "default": "98/456"
            },
            "street": {
              "type": "string",
              "default": "street"
            },
            "subdistrict": {
              "type": "string",
              "default": "subdistrict"
            },
            "district": {
              "type": "string",
              "default": "district"
            },
            "province": {
              "type": "string",
              "default": "province"
            },
            "postal_code": {
              "type": "string",
              "default": "14565"
            }
          },
          "required": [
            "address_id",
            "receiver",
            "building_number",
            "street",
            "subdistrict",
            "district",
            "province",
            "postal_code"
          ]
        },
        "ProductModel": {
          "type": "object",
          "properties": {
            "product_id": {
              "type": "string",
              "default": "name"
            },
            "number": {
              "type": "number",
              "default": "number"
            },
            "name": {
              "type": "string",
              "default": "name"
            },
            "type": {
              "type": "string",
              "default": "type"
            },
            "height": {
              "type": "string",
              "default": "height"
            },
            "weight": {
              "type": "string",
              "default": "weight"
            },
            "image": {
              "type": "string",
              "default": "image"
            },
            "price": {
              "type": "number",
              "default": "price"
            }
          },
          "required": [
            "product_id",
            "number",
            "name",
            "type",
            "height",
            "weight",
            "image",
            "price"
          ]
        },
        "UserCreateOrderDto": {
          "type": "object",
          "properties": {
            "product_id": {
              "type": "string"
            },
            "address_id": {
              "type": "string"
            }
          },
          "required": [
            "product_id",
            "address_id"
          ]
        },
        "OrderModel": {
          "type": "object",
          "properties": {
            "order_id": {
              "type": "string",
              "default": "00000000-0000-0000-0000-000000000000"
            },
            "status": {
              "type": "string",
              "default": "status"
            },
            "product": {
              "default": "product",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ProductModel"
                }
              ]
            },
            "address": {
              "default": "address",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AddressModel"
                }
              ]
            }
          },
          "required": [
            "order_id",
            "status",
            "product",
            "address"
          ]
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
