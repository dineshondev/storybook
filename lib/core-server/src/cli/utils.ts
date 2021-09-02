import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';

export function parseList(str: string): string[] {
  return str
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function getEnvConfig(program: Record<string, any>, configEnv: Record<string, any>): void {
  Object.keys(configEnv).forEach((fieldName) => {
    const envVarName = configEnv[fieldName];
    const envVarValue = process.env[envVarName];
    if (envVarValue) {
      program[fieldName] = envVarValue; // eslint-disable-line
    }
  });
}

const warnDLLsDeprecated = deprecate(
  () => {},
  dedent`
    DLL-related CLI flags are deprecated, see:
    
    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-dll-flags
  `
);

export function checkDeprecatedFlags(options: {
  dll?: boolean;
  uiDll?: boolean;
  docsDll?: boolean;
  staticDirs?: string[];
}) {
  if (!options.dll || options.uiDll || options.docsDll) {
    warnDLLsDeprecated();
  } else if (options.staticDirs) {
    deprecate(
      () => {},
      dedent`
      --static-dir CLI flag is deprecated, see:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-static-dir-flag
    `
    );
  }
}
