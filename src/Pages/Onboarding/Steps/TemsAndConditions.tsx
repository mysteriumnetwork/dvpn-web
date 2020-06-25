import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"

const TermsAndConditions = () => {
  return (
    <div className="step-block term-and-conditions">
      <h1 className="step-block--heading">Terms & Conditions</h1>
      <div className="step-block-content">
        <div className="terms-and-conditions">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac diam ac eros sollicitudin laoreet ac et
            orci. Nulla velit lacus, scelerisque eu purus eu, pharetra luctus nibh. Duis euismod vitae risus luctus
            egestas. Vivamus sagittis id sapien vitae rutrum. Etiam pellentesque rutrum tellus. Etiam placerat erat a
            purus aliquam, sed pretium risus facilisis. Maecenas sed enim sit amet nulla cursus viverra at vitae sapien.
            Nam ac vulputate metus, non eleifend ipsum. Proin vel viverra libero. Praesent non pharetra tellus. Vivamus
            commodo magna vel libero sagittis dignissim. Praesent id purus id tortor eleifend maximus. Curabitur nibh
            neque, condimentum sed nulla ut, tempor porta dolor. Donec at consectetur felis. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed a elit quis tellus elementum rutrum.

            Nulla enim est, rutrum a viverra in, maximus vitae enim. Aliquam a erat id metus rutrum maximus quis vitae
            neque. Sed dapibus erat vitae iaculis fermentum. Integer malesuada lacus eget diam ultricies, a vulputate
            ante aliquam. Quisque tortor urna, mattis sit amet nisl in, auctor ullamcorper ligula. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Quisque dictum blandit sapien, a laoreet nunc
            bibendum dignissim. Pellentesque laoreet neque ut eros dignissim sollicitudin. Aenean vulputate mattis odio,
            vel vestibulum est ornare in. Fusce sagittis, ligula sit amet euismod malesuada, odio ligula maximus nulla,
            at sollicitudin mauris ipsum nec mauris. Aenean justo velit, iaculis in elit at, gravida scelerisque velit.
            Aenean in venenatis erat. Aliquam consectetur tortor a mi tincidunt, ac condimentum magna fermentum. In hac
            habitasse platea dictumst. Nullam sagittis turpis congue, lacinia lacus sed, tristique metus.

            Vestibulum ultricies, mauris non feugiat luctus, augue neque interdum quam, at pellentesque arcu nisl quis
            tellus. Nullam venenatis leo lacus, nec porta velit pharetra et. Maecenas ac neque a tortor fermentum
            dapibus. Nulla facilisi. Nam placerat ante vitae erat molestie, in convallis turpis mattis. Suspendisse
            pharetra massa at ligula lacinia, ut pharetra velit gravida. Proin lobortis justo id diam sodales ultricies
            nec eu ante.

            Praesent interdum, ex quis viverra ultricies, sem turpis interdum nibh, at aliquam lorem lorem eu orci.
            Quisque dapibus laoreet orci id viverra. Donec leo diam, mattis at venenatis eu, eleifend id augue.
            Pellentesque rhoncus ac augue quis cursus. Sed in mollis mi, a euismod dolor. Proin et lacus vel nisl porta
            posuere id in sem. Pellentesque volutpat ligula a aliquam pretium. Suspendisse tellus ex, semper vitae nisi
            quis, hendrerit vehicula sem. Sed vitae sem ut ex vulputate semper non ac tortor. Morbi hendrerit faucibus
            odio a scelerisque. Suspendisse pharetra nec felis id malesuada. Quisque sodales posuere egestas.

            Sed nec tempus lacus, eu pulvinar erat. Nam imperdiet dictum turpis, ut congue orci vulputate vel. Praesent
            magna arcu, tempor nec cursus eu, luctus eget turpis. Fusce sit amet efficitur mauris. Mauris vehicula, dui
            in congue imperdiet, ex eros imperdiet nisl, et tempus mauris eros at massa. Maecenas fringilla ex at nisl
            aliquet, quis fermentum elit vulputate. Duis venenatis metus non ex interdum, et euismod risus scelerisque.
            Curabitur blandit, nunc sit amet egestas dapibus, sem arcu hendrerit mi, vel ultricies odio elit suscipit
            orci. Donec ut magna facilisis, accumsan felis sed, dignissim neque. Vivamus in felis luctus, porttitor
            justo eu, viverra dui. Vivamus hendrerit id urna at efficitur. Integer fringilla tincidunt leo, vitae
            tincidunt ipsum sodales eget. Nulla consectetur elementum tortor sed sollicitudin. Aliquam erat volutpat.
            Morbi sed quam vel arcu varius venenatis id auctor orci. Class aptent taciti sociosqu ad litora torquent per
            conubia</p>
        </div>
        <Link to="/onboarding/service-settings" className="btn btn-filled btn-center accept"><span className="btn-text">I accept</span></Link>
      </div>
      <StepCounter step={2}/>
    </div>
  );
};

export default TermsAndConditions;