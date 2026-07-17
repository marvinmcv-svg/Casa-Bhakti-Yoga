"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BilingualTextProps {
  label: string;
  valueEn: string;
  valueEs: string;
  onChange: (v: { en: string; es: string }) => void;
  multiline?: boolean;
  rows?: number;
}

export function BilingualText({
  label,
  valueEn,
  valueEs,
  onChange,
  multiline = false,
  rows = 3,
}: BilingualTextProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-[10px] uppercase tracking-wider text-clay">EN</span>
          {multiline ? (
            <Textarea
              value={valueEn}
              onChange={(e) => onChange({ en: e.target.value, es: valueEs })}
              rows={rows}
              className="resize-none"
            />
          ) : (
            <Input
              value={valueEn}
              onChange={(e) => onChange({ en: e.target.value, es: valueEs })}
            />
          )}
        </div>
        <div>
          <span className="mb-1 block text-[10px] uppercase tracking-wider text-clay">ES</span>
          {multiline ? (
            <Textarea
              value={valueEs}
              onChange={(e) => onChange({ en: valueEn, es: e.target.value })}
              rows={rows}
              className="resize-none"
            />
          ) : (
            <Input
              value={valueEs}
              onChange={(e) => onChange({ en: valueEn, es: e.target.value })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

export function Field({ label, value, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
