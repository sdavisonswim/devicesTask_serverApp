**Device Management App**

This project is a Device Management application designed to handle device inventory with features like adding, editing, filtering, sorting, and searching devices.

**Features**

Add and Edit Devices: Add new devices or edit existing device information.

Filter by Device Type: Filter devices based on the type (All, Windows, Mac, Linux).

Sort Devices: Sort devices by system name (A-Z, Z-A) or HDD capacity (Low to High, High to Low).

Search Devices: Search for devices by system name.

Responsive Design: User-friendly interface for managing device inventory.

**Installation**

```git clone https://github.com/your-username/device-management-app.git```

```cd devicesTask_serverApp```

Install Dependencies:
------------

```bash
$ npm install
```


Run dev server:

-exposes port:3001
------------

```bash
$ npm start
```

Start webpack build process:

-will auto build on save

-client is hosted on port:8080
------------

```bash
$ npm run dev
```


API:
------------

Base url: `http://localhost:3001`

Fetch DeviceList

```bash
GET /devices
```

Fetch specific device

```bash
GET /devices/:id
```

Remove device from DeviceList

```bash
DELETE /devices/:id
```

Create new device
  
```bash
POST /devices
```
> |  Request Body                                                           | content-type          |
> |:------------------------------------------------------------------------|:----------------------|
> | `{"system_name": "DESKTOP-ONE","type": "WINDOWS","hdd_capacity": "92"}` | `application/json`    |

Update device

```bash
PUT /devices/:id
```
> |  Request Body                                                            | content-type          |
> |:-------------------------------------------------------------------------|:----------------------|
> | `{"system_name": "DESKTOP-OFFICE","type": "MAC","hdd_capacity": "500"}`  | `application/json`    |

**Components**

DeviceModal
  Handles adding and editing device details.

TableActions
  Provides search, filter, and sort functionalities for the device table.

DeviceList
  Renders the list of devices with their details.

**Styling**

CSS Modules
  Scoped CSS: Each component has its corresponding CSS module for specific styling.

  Global Styles: Common styles are defined in styles.css.

**Usage**

Adding a Device

  -Open the modal by clicking the "Add Device" button.

  -Fill in the details.

  -Submit to add the device to the inventory.

Editing a Device

  -Open the edit modal by clicking the edit icon next to a device.

  -Modify the details.

  -Submit to save changes.

Filtering Devices

  -Select a device type from the filter dropdown in TableActions.

  -View the filtered list of devices.

Sorting Devices

  -Select a sort option from the sort dropdown in TableActions.

  -View the sorted list of devices.

Searching Devices

  -Enter a search term in the search input.

  -View the matching devices based on the search term.
