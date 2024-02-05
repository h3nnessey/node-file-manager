# CLI based File Manager using NodeJS platform

## Read the following before you get started!

- The program is started by npm-script start in following way:
  ```bash
  npm run start -- --username=your_username
  ```
- Exit the program:
  ```bash
  # type this command in the console (or use `ctrl + c` shortcut)
  .exit
  ```
- **Be sure you are running the terminal as an administrator**
- All paths with spaces must be enclosed in double quotes:
  ```bash
   cd "C:/Users/Ivan Petrov/"
  ```

## Commands

- Navigation & working directory
  - `up`
    - Go upper from current directory. If you are in the root directory, nothing will happen and you will stay there.
  - `cd path_to_directory`
    - Go to dedicated folder from current directory (path_to_directory can be relative or absolute, e.g. `./files` or `C:/Users/`)
  - `ls`
    - Print in console list of all files and folders in current directory (also includes symlinks files)
- Basic operations with files
  - `cat path_to_file`
    - Read file and print it's content in console, e.g. `cat react-app/package.json`
  - `add new_file_name`
    - Create empty file in current working directory, e.g. `add text.txt`.
  - `rn path_to_file new_filename`
    - Rename file. `new_file_name` means a new file name, including the `extension`, but never the path to any directory (e.g. `rn C:/Users/Home/text.txt homework.md`), otherwise an `Invalid Input` error will be thrown.
  - `cp path_to_file path_to_new_directory`
    - Copy file, e.g. `cp ./files/text.txt D:/temp/`
  - `mv path_to_file path_to_new_directory`
    - Move file. Same as copy but initial file is deleted, e.g. `mv C:/Users/PC/Desktop/cat.jpeg D:/Pictures/`
  - `rm path_to_file`
    - Delete file, e.g. `rm D:/trash/random.png`
- Operating system info
  - `os --EOL`
    - Get EOL (default system End-Of-Line)
  - `os --cpus`
    - Get host machine CPUs info
  - `os --homedir`
    - Get home directory
  - `os --username`
    - Get current system user name
  - `os --architecture`
    - Get CPU architecture for which Node.js binary has compiled
- Hash calculation
  - `hash path_to_file`
    - Calculate hash for file, e.g. `hash D:/Pictures/123.jpg`
- Compress and decompress operations
  - `compress path_to_file path_to_destination`
    - Compress file using Brotli algorithm. `path_to_file` must be the path to the file and not contain the archive extension `.br`.The `path_to_destination` must be the path to the file and must contain the source extension and `.br`. e.g. `compress C:/Users/Home/Pictures/cute-cat.png D:/files/cute-cat.png.br`
  - `decompress path_to_file path_to_destination`
    - Decompress file using Brotli algorithm. `path_to_file` must be the `.br` archive. `path_to_destination` must not be a `.br` archive. e.g. `decompress D:/files/cute-cat.png.br C:/Users/Dad/Pictures/cute-cat.png`
