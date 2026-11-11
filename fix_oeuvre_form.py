import os
path = r'C:\Users\GIGABYTE\Documents\workspace-spring-tools-for-eclipse-5.4.0.RELEASE\musees-frontend\src\app\components\oeuvre-form\oeuvre-form.component.ts'
content = "import { Component, OnInit } from '@angular/core';\nimport { Oeuvre, Musee } from '../../models';\nimport { OeuvreService } from '../../services/oeuvre.service';\nimport { MuseeService } from '../../services/musee.service';\nimport { Router,77 } from '@angular/router';"
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('done')