import chalk from 'chalk';
import gradient from 'gradient-string';

export const logger = {
    error: (...args) => console.log(chalk.red('[ERROR]'), ...args),
    info: (...args) => console.log(chalk.blue('[INFO]'), ...args),
    warning: (...args) => console.log(chalk.yellow('[WARNING]'), ...args),
    success: (...args) => console.log(chalk.green('[SUCCESS]'), ...args)
};

export const asciiArt = `
 +@@@@-  :@@@@@            :###                                                       *##=
 @@@@@@  %@@@@@: =#%@@@#+  -@@@ .*##*. -*%@@@#+   =#%@@@%+  =#%@@@%+. .###-#%% .*%@@%=%@@*
.@@@*@@*+@@+@@@- +++++%@@% -@@@+@@%-  *@@%   @@% %@@@      %@@#--+@@@-:@@@@#**.@@@%=-+@@@*
:@@@ @@@@@% @@@+ *@@#*#@@@.-@@@+@@@-  %@@@****** @@@*      @@@-   @@@+:@@@=   :@@@=   %@@*
-@@% -@@@@: #@@* @@@+=#@@@.-@@@ -@@@* :%@@@%%%@# -@@@@%%@@ =@@@%%@@@* :@@@:    *@@@%%%@@@*                                                                                                                                                      
`;

export function showStartupBanner() {
    console.log(gradient.pastel.multiline(asciiArt));
    console.log(gradient.pastel('https://npmjs.com/makecord-create'));
    console.log(gradient.pastel('This bot created with Makecord | Makecord by LuziXP'));
    console.log('\n');
}
