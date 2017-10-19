/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Browser config object generator: https://app.crossbrowsertesting.com/selenium/run

const DEFAULTS = {
  common: {
    record_video: 'true',
    record_network: 'true',
  },
  desktop: {
    'screenResolution': '1400x900',
  },
  mobile: {
  },
};

// TODO(acdvorak): Use builder pattern instead?
class CbtBrowserConfig {
  static all(...overrides) {
    return [
      ...this.desktop(...overrides),
      ...this.mobile(...overrides),
    ];
  }

  static desktop(...overrides) {
    return this.merge_(
      [
        {
          'browserName': 'Chrome',
          'version': '48x64',
          'platform': 'Mac OSX 10.8',
        },
        {
          'browserName': 'Firefox',
          'version': '46',
          'platform': 'Mac OSX 10.8',
        },
        {
          'browserName': 'Safari',
          'version': '6.2',
          'platform': 'Mac OSX 10.8',
        },
      ],
      DEFAULTS.common,
      DEFAULTS.desktop,
      ...overrides);
  }

  static mobile(...overrides) {
    return this.merge_(
      [
        {
          'browserName': 'Safari',
          'deviceName': 'iPad 3 Simulator',
          'platformVersion': '6.1',
          'platformName': 'iOS',
          'deviceOrientation': 'landscape',
        },
      ],
      DEFAULTS.common,
      DEFAULTS.mobile,
      ...overrides);
  }

  static merge_(browsers, ...overrides) {
    return browsers
      .map((browser) => Object.assign(browser, ...overrides))
      .map((browser) => Object.assign({password: browser.authkey}, browser));
  }
}

module.exports = {CbtBrowserConfig};