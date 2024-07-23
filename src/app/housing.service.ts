import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:4000/locations";
  readonly baseUrl = "https://angular.dev/assets/images/tutorials/common";

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    const data: HousingLocation[] = (await response.json()) ?? [];
    return data.map((housingLocation) => ({
      ...housingLocation,
      photo: this.#formatPhotoUrl(housingLocation.photo),
    }));
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    const data: HousingLocation = (await response.json()) ?? {};
    return {
      ...data,
      photo: this.#formatPhotoUrl(data.photo),
    };
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }

  #formatPhotoUrl(photoUrl: string) {
    return `${this.baseUrl}${photoUrl}`;
  }
}
