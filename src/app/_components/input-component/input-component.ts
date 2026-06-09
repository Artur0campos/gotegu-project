import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  standalone: true,
  imports: [FormsModule], // Importante para usarmos o ngModel internamente
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() text: string = 'label';
  @Input() placeholder: string = '';

  // Atributos internos para gerenciar o valor e os estados
  innerValue: string = '';
  disabled: boolean = false;

  // Funções de retorno que o Angular injeta no componente
  onChange: any = () => {};
  onTouched: any = () => {};

  // Método chamado pelo Angular quando o formulário pai atualiza o valor do campo
  writeValue(value: any): void {
    this.innerValue = value || '';
  }

  // Registra a função que avisa o formulário pai que o valor mudou
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra a função que avisa que o campo foi tocado (útil para validação de erro)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Chamado pelo Angular se o formulário pai desabilitar o campo
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método executado sempre que o usuário digita algo
  onModelChange(newValue: string) {
    this.innerValue = newValue;
    this.onChange(newValue); // Avisa o pai sobre a mudança
  }
}