import * as fs from 'fs';
import * as path from 'path';
import { parse as parseYaml } from 'yaml';
import { z, ZodType } from 'zod';
import {ConfigType, ConfigSchema} from './schema';
import { idGenerator } from '@plugger/utils';



class AppConfig {
    config: ConfigType;
    schema: ZodType;

    constructor(config?: ConfigType) {
        this.schema = ConfigSchema;


        this.config = this.schema.parse(config || {});

    }



    getExtensionConfig(namespace: string, name: string, kind: string){
        const id = idGenerator(namespace, name, kind);
        return this.config.extensions[id];
    }
}

function createAppConfig({
    config
}: {
    config?: ConfigType;
} = {}) {
    return new AppConfig(config);
}

export { createAppConfig, AppConfig };
export type { ConfigType };
