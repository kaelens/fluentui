import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants, teamsLightTheme } from '@fluentui/react-theme';
import type { ColorOverrides } from '../../utils/colorOverrides';
import { OverridableTokenBrandColors } from './OverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';

import type { DispatchTheme } from '../../useThemeDesignerReducer';

export interface ColorTokensProps {
  className?: string;
  isDark: boolean;
  brand: BrandVariants;
  dispatchState: React.Dispatch<DispatchTheme>;
}

const useStyles = makeStyles({
  root: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
  },
});

const brandColors: ColorOverrides = OverridableTokenBrandColors(teamsLightTheme, brandTeams);

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { brand, dispatchState } = props;

  const colorOverrideReducer: (
    state: ColorOverrides,
    action: { colorToken: string; newValue: Brands },
  ) => ColorOverrides = (state, action) => {
    const overrides = { ...state, [action.colorToken]: action.newValue };
    dispatchState({ type: 'Overrides', overrides: overrides });
    return overrides;
  };

  const [colorOverrides, dispatchColorOverrides] = React.useReducer(colorOverrideReducer, {});

  return (
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
      </div>
      <ColorTokensList
        brand={brand}
        brandColors={brandColors}
        colorOverrides={colorOverrides}
        dispatchColorOverrides={dispatchColorOverrides}
      />
    </div>
  );
};
