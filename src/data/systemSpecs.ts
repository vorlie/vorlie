// src/data/systemSpecs.ts
export interface Component {
  label: string;
  value: string;
  notes?: string;
  link?: string;
}

export interface SoftwareDetail {
  label: string;
  value: string;
  notes?: string;
}

export interface SystemDetails {
  name: string;
  description?: string;
  specs: Component[];
  peripherals?: Component[];
  softwareAndOS?: SoftwareDetail[];
}

export const allSystemSpecs: SystemDetails[] = [
  {
    name: "Main Gaming PC",
    description:
      "My primary setup for gaming, coding, and daily use. It's undergone a few upgrades since its initial build.",
    specs: [
      { label: "CPU", value: "AMD Ryzen 5 3600" },
      {
        label: "GPU",
        value: "ASUS Radeon RX 7600 Dual OC V2 8GB GDDR6",
      },
      { label: "RAM", value: "Corsair Vengeance LPX 2x8GB 3200MT/s CL16" },
      { label: "Motherboard", value: "ASUS Prime B450M-A II" },
      {
        label: "Storage (NVMe)",
        value: "GOODRAM PX500 PCIe GEN 3 x4 NVMe 256GB",
      },
      {
        label: "Storage (SATA)",
        value: 'GOODRAM CX400 SATA 2,5" 1TB',
      },
      { label: "Storage (HDD)", value: 'TOSHIBA MQ01ABD100 1TB 2,5"' },
      { label: "CPU Cooler", value: "SilentiumPC Fortis 3" },
      { label: "Power Supply", value: "Cooler Master MWE V2 500W 80 Plus" },
      { label: "Case", value: "Cooler Master MasterBox Q300L" },
    ],
    peripherals: [
      { label: "Monitor", value: "AOC 2470W" },
      { label: "Keyboard", value: "SPC Gear GK630K Onyx White" },
      { label: "Mouse", value: "Logitech G102 / G203 Lightsync Lilac" },
      { label: "Headset", value: "SPC Gear Viro Plus Onyx White" },
      { label: "Mousepad", value: "KRUX Space XXL" },
      { label: "Controller", value: "DualShock 4 White" },
    ],
    softwareAndOS: [
      {
        label: "System",
        value: "Dual Boot: Arch Linux / Windows 10 IoT Enterprise LTSC",
      },
      {
        label: "Primary OS",
        value: "Arch Linux + KDE Plasma 6",
        notes:
          "I use Arch Linux as my primary OS, where I mostly play games and code.",
      },
      {
        label: "Windows Use",
        value: "Gaming & Specific Software",
        notes: "Windows is used mainly for kernel anti-cheat games.",
      },
      {
        label: "Dev Env.",
        value: "Python 3.13+, Node.js (LTS), VS Code",
      },
    ],
  },
  {
    name: "Old PC",
    description:
      "This is my old PC which I gave to my brother. It still serves as a capable machine for basic tasks and light gaming.",
    specs: [
      { label: "CPU", value: "Intel Core i5-4590" },
      {
        label: "GPU",
        value: "MSI Radeon RX 570 ARMOR OC 4GB GDDR5",
      },
      { label: "RAM", value: "X-Star Tiger Shark DDR3 2x8GB 1600Mhz" },
      { label: "Motherboard", value: "ASUS H81M-PLUS" },
      { label: "Storage (SSD)", value: "Goodram CX400 128GB" },
      { label: "Storage (HDD)", value: 'WD BLUE 500GB 3.5"' },
      { label: "Power Supply", value: "be quiet! 450W", notes: "I think, didn't look inside to check." },
      { label: "Case", value: "Some case from Genesis" },
    ],
    softwareAndOS: [
      {
        label: "System",
        value: "Windows 10 Pro",
      },
    ],
  },
];
