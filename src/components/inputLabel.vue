<template>
  <div :class="['input-label', className, !!value ? 'has' : '', disabled ? 'disabled' : '']">
    <input :value="value" :type="type" :disabled="disabled" />
    <div v-if="hasTip" className="input-label__tip">
      <svg-icon v-if="prefixIcon" :icon-class="prefixIcon" />
      <span v-if="placeholder">{{ placeholder }}</span>
    </div>
    <div v-if="required" class="input-label__required">*</div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, computed } from 'vue'
interface Props {
  value?: string
  required?: boolean
  disabled?: boolean
  prefixIcon?: string
  placeholder?: string
  className?: string
  type?: string
}
const props = withDefaults(defineProps<Props>(), {
  required: false
})
const { value, type, required, prefixIcon, placeholder, className, disabled } = toRefs(props)
const hasTip = computed(() => {
  return placeholder?.value && prefixIcon?.value
})
</script>
<style lang="less" scoped>
.active() {
  font-size: 14px;
  z-index: 1;
  top: -9px;
  color: var(--primary);
  background: #f0f2f7;
}

.input-label {
  position: relative;

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #c0ccda;
    box-shadow: 0 1px 1px var(--white_opacity_8);
    color: #484848;
    padding: 0 20px;
    font-size: 16px;
    background: linear-gradient(#f0f2f7, #fff);
    outline: none;
    transition: border-color 0.25s;

    &:focus {
      border-color: var(--primary);

      &+.input-label__tip {
        .active();
      }

      &~.input-label__required {
        color: var(--primary);
      }
    }
  }

  &__tip {
    display: flex;
    align-items: center;
    padding-left: 5px;
    font-size: 15px;
    color: #c0c4cc;
    position: absolute;
    left: 17px;
    top: 11px;
    transition: 0.25s;
    pointer-events: none;

    .icon {
      margin-right: 3px;
    }
  }

  &__required {
    position: absolute;
    right: calc(~'100% + 5px');
    top: 50%;
    transform: translateY(-50%);
    color: #c0c4cc;
  }

  &.has {
    input {
      border-color: var(--primary);
    }

    .input-label__required {
      color: var(--primary);
    }

    .input-label__tip {
      .active();
    }
  }

  &.disabled {
    input {
      border-color: var(--gray_4);
      color: var(--gray_4);
    }

    .input-label__required {
      color: var(--gray_4);
    }

    .input-label__tip {
      color: var(--gray_4);
    }
  }
}
</style>



<!-- const InputLabel: InputLabel = ({ value, type, required = false, prefixIcon, placeholder, className, onChange, disabled }) => {
  const hasTip = placeholder && prefixIcon
  return (
    <div
      className={classnames('input-label', className, {
        has: !!value,
        disabled
      })}
    >
      <input value={value} type={type} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
      {hasTip && (
        <div className="input-label__tip">
          {prefixIcon && <Icon name={prefixIcon} />}
          {placeholder && <span>{placeholder}</span>}
        </div>
      )}
      {required && <div className="input-label__required">*</div>}
    </div>
  )
} -->