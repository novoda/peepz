package com.novoda.peepz;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

final class PeepViewHolder extends RecyclerView.ViewHolder {

    public static PeepViewHolder inflateView(ViewGroup parent) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.view_peep, parent, false);
        return new PeepViewHolder(itemView);
    }

    private PeepViewHolder(View itemView) {
        super(itemView);
    }

    public void bind(Peep peep) {
        ((PeepView) itemView).bind(peep);
    }

}
