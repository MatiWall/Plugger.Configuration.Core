import { AppConfig, createAppConfig, ConfigType } from './AppConfig';
import * as fs from 'fs';
import * as path from 'path';
import { parse as parseYaml } from 'yaml';
import {ConfigSchema} from './schema';
import { create } from 'domain';


// Mock fs and path modules
jest.mock('fs');
jest.mock('path');
jest.mock('yaml', () => ({
  parse: jest.fn()
}));

describe('AppConfig', () => {
    afterEach(() => {
        jest.clearAllMocks();  // Reset mocks after each test
    });

    test('Create AppConfig with defaults', ()=>{
        const appConfig = createAppConfig();
    })


    test('Access Extension config', ()=>{

        const extensionConfig = {
            'this': 'is the config for an extensions'
        }

        const mockJsonData: ConfigType = { 
            app: { title: 'test', url: 'https://test.com'}, 
            environment: 'test',
            extensions: {
                'component:test/test': extensionConfig
            }
        };
        
        const appConfig = createAppConfig({config: mockJsonData});


        expect(appConfig.getExtensionConfig('test', 'test', 'component')).toBe(extensionConfig);
    })
});
