# Строение репозитория и использование программы

## Папка cli

В данной папке хранится версия с командным интерфейсом программы. Это - ваш выбор, если вы хотите отредактировать .txt файлы и быстро записать их используя .exe.

После того, как вы внесли изменения в файлы \_trans.txt в папке translation - **запустите файл json-writer.exe.**

**Через несколько секунд, он создаст конечные файлы в папке data и js, которые вы можете скопировать в папку www, находящуюся в корне игры (C:\Program Files (x86)\Steam\steamapps\common\Fear & Hunger 2 Termina\www) с заменой.**

## Папка gui

В этой папке хранится исходный код графического интерфейса для редактирования файлов. Если вы хотите воспользоватся интерфейсом - **скачивать нужно НЕ это.**

Пулл реквесты и сообщения об ошибках приветствуются.

### Билдинг приложения

Клонируйте репозиторий с помощью\
`git clone https://github.com/savannstm/fh-termina-json-writer.git`.

Перейдите в директорию gui и установите все необходимые Node.js библиотеки с помощью\
`npm install --include=dev`.

Запустите\
`npm run build-dev`,\
чтобы забилдить приложение только под win32 x64 (конфигурацию dev билдинга вы можете изменить в package.json), либо\
`npm run build`,\
чтобы забилдить приложение под все платформы.

Если вы хотите внести какие-то изменения в код проекта - вносите его в файлы из папки `src-dev`.

После билдинга в директории `gui` появится директория `target`, содержащая директории с разными выпусками программы. Перед тем как билдить приложения для продакшена, убедитесь, что переменные `DEBUG` в `src-dev/backend/app.js` и `PRODUCTION` в `src-dev/frontend/main.js` установлены на `false` и `true` соответственно.

После успешного билдинга, закиньте папку `translation` в корень забилженной программы, и тестируйте её как хотите.

## Папка translation

В этой папке хранятся файлы локализации в формате .txt. Если вы хотите что-то изменить - вы должны отредактировать именно их, а затем записать используя .exe, либо скопировать в корень графического интерфейса, и согласно инструкциям записать через него.

### Папка maps

В папке maps хранится игровой текст из файлов Maps.json.
В файлах без префикса \_trans находится оригинальный текст игры (его лучше не редактировать), а в файлах с этим префиксом лежит переведенный текст, который вы можете отредактировать.

### Папка other

В папке other хранится игровой текст НЕ из файлов Maps.json.
В файлах без префикса \_trans находится оригинальный текст игры (его лучше не редактировать), а в файлах с этим префиксом лежит переведенный текст, который вы можете отредактировать.

### Папка plugins

В папке plugins хранится игровой текст из файла plugins.js.
В файлах без префикса \_trans находится оригинальный текст игры (его лучше не редактировать), а в файлах с этим префиксом лежит переведенный текст, который вы можете отредактировать.
