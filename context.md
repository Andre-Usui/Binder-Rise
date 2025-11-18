# Atualização 1.1.0 - Adição de 'Folders' 

Folders são organizadores de Disciplines que possuem contextos similares. Posicionados na Disciplines Tabs e tem como principal objetivo evitar a que a discipline tab fique poluído visualmente. 

## Backlog

### Update IDB

- [x] Criar objectStore 'folders' 
  - [x] deve possuir os campos 'folder_id' e 'disciplines_position' 
- [x] Criar objectStore 'settings'
  - [x] deve possuir os campos 'settings_id', 'positions', 'last_position' e 'style'
  - Ideia para implementações futuras relacionadas ao visual ('style') da aplicação
  - [] Adequar antigas disciplines.position para o novo store
- [x] Adicionar as Columns 'folder' no objectStore 'disciplines'

### DB
- [x] Implementar update no db3 para adicionar um field em disciplines para vincular ao Folder
- [x] Implementar um schema para folder 
  - [x] O schema deve possuir as columns 'folder_id', 'disciplines_position' - Done
  - [x] Folder deve ser chamado junto com getAllDisciplines, renderizado na discipline tab
- [ ] Folder é atrelado na Discipline via editDiscipline
  - [] Caso alguma Folder seja atrelada, a position fica Null e folder_position vai para o último inteiro atrelado ao folder
- [] Folder possui uma propriedade disciplines_position: um Array de discipline_id


### Positions 

- Positions agora é uma chave do schema Settings
- a verificação da TAB será um ARRAY de NUMBERS e OBJ
  - NUMBERS é caso seja uma DISCIPLINE
  - OBJ caso seja um FOLDER
- [] organizar estratégia e ajustar front-end 
- [] organizar estratégia e ajustar bd

### Front-end

- [x] Folder add's Tab 
- [x] Folder add Container
- [x] Folder Shape Tab
- [x] Folder edit Container
- [] Folder edit deve possibilitar adicionar, editar ou remover posições das disciplinas

### Planos

- [x] preview Tab em edit 
- [x] otimizar select para escolhido anteriormente
- [x] adicionar visualização sobre select com cor respectiva
- [] otimizar landscreen disponibilizando exemplos e how-to's
- [] how to use expanded Page
- [] compomenentizar Header ~ Tabs
  - [] Separar Componentes em pastas com seus respectivos CSS
  - [] Otimizar os padrões Root do css
- [] BR - Custom - Style (Brasileiro)
- [] possibilitar editar posições de Pages dentro da Discipline
- [] codificar com o app ensinado de segurança
- [] animations no header tabs

### Bugs

- [] Criar uma nova Disciplina não vai para a página nova


i had a dream, and then i B in der  R is e! [Be in there are easy!] 