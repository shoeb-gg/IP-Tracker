import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const materials = [MatButtonModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, materials],
  exports: [materials],
})
export class MaterialModule {}
