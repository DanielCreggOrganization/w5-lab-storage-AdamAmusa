// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storage: Storage, private storageService: StorageService) {
    storage.create();

    

  }
    async remove(){
      await this.storageService.remove(this.key);
      this.output = "Item removed";
    }

    async clear(){
      await this.storageService.clear();
      this.output = "Storage cleared";
    }

    async keys(){
      const keys = await this.storageService.keys();
      this.output = "Keys are " + keys.toString();  
    }

    async length(){
      const length = await this.storageService.length();
      this.output = length.toString();
    }

    async iterate(){
      await this.storageService.forEach((value, key, iterationNumber) => {
        this.output = `Key: ${key}, Value: ${value}, Iteration: ${iterationNumber}`;
      });
    }

  async setItem() {
    try {
      await this.storage.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storage.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }
}

